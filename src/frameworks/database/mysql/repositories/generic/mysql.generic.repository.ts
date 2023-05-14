import {
    DataSource,
    DeepPartial,
    FindOneOptions,
    FindOptionsSelect,
    QueryRunner,
    Repository
} from "typeorm";
import {IGenericRepository} from "../../core/abstract/generic.repository.abstract";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {RespuestaPaginadaInterface} from "../../core/interfaces/respuesta_paginada.interface";
import { generateUUID } from "../../../../../helpers/generateUUID";
import { BuscarRegistrosInterface } from "../../core/interfaces/buscar_registros.interface";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

export class MysqlGenericRepository<T> implements IGenericRepository<T> {
    public _repositorio: Repository<T>;

    constructor(repository: Repository<T>, private readonly dataSource: DataSource) {
        this._repositorio = repository
    }


    /**
     * Método que permite buscar todos los registros de una entidad.
     * @param opcionesDeConsulta - Opciones de consulta para el select.
     * @param condicion - Condición para el where.
     * @param relaciones - Relaciones que se desean obtener.
     */
    async obtenerRegistros(opcionesDeConsulta?: FindOptionsSelect<T>, condicion?:FindOptionsWhere<T>, relaciones?:string[]): Promise<T[]> {
        const registros: T[] = await this._repositorio.find({where: condicion, relations: relaciones ? relaciones : [], select: opcionesDeConsulta});
        if (!registros) {
            throw new NotFoundException(`No se encontraron registros en la base de datos.`);
        }
        return registros;
    }

    /**
     * Método que permite obtener un registro de la base de datos.
     * @param opcionesDeConsultas
     * @param nombreDeLaEntidad
     * @param lanzarExepcion
     */
    async obtenerUnRegistroPor(opcionesDeConsultas: FindOneOptions<T>, nombreDeLaEntidad: string, lanzarExepcion?: boolean): Promise<T> {
        nombreDeLaEntidad = nombreDeLaEntidad ? nombreDeLaEntidad : this._repositorio.metadata.name;
        const entidad: T = await this._repositorio.findOne(opcionesDeConsultas);
        if (!entidad && lanzarExepcion) {
            if (!entidad) throw new NotFoundException(`No se encontró el registro de ${nombreDeLaEntidad} en la base de datos.`);
            // @ts-ignore
            if (entidad.estado === 0) throw new NotFoundException(`El registro de ${nombreDeLaEntidad} se encuentra eliminado.`);
        }
        return entidad;

    }

    /**
     * Método que retorna todos los registros de una entidad.
     * También se puede especificar un select y un where.
     * Tener en cuenta que una entidad representa una tabla de la base de datos.
     * @param where
     * @param options
     */
    public async obtenerRegistrosPor(where: FindOptionsWhere<T> | FindOptionsWhere<T>[], options?: FindOneOptions<T>): Promise<T[]> {
        try {
            const select = options ? options.select : [];
            return await this._repositorio.find({ where, select});
        } catch (e) {
            throw new BadRequestException('Los datos enviados no son correctos.');
        }
    }

    /**
     * Método que convierte el dto en una entidad de la base de datos.
     * @param entidad
     */
    async crearRegistro(entidad: DeepPartial<T>): Promise<T> {
        try {
            /**
             * Se crea una nueva instancia De La Entidad de la entidad que se recibe como parámetro.
             * */
            // @ts-ignore
            const instanciaDeLaEntidad: T = this._repositorio.create({...entidad, uuid: generateUUID()});
            /**
             * Se guarda la nueva instancia De La Entidad de la entidad en la base de datos.
             */
            await this._repositorio.save(instanciaDeLaEntidad);

            /**
             * Se retorna la nueva instancia De La Entidadque se acaba de guardar en la base de datos.
             */
            return instanciaDeLaEntidad;

        } catch (error) {
            console.log(error);
            if (error.code === 'ER_DUP_ENTRY') {
                throw new BadRequestException(`Ya existe un registro con el mismo nombre.`);
            }

            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                throw new BadRequestException(`No existe el registro con el id enviado.`);
            }

            if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
                throw new InternalServerErrorException('No se reconocen los campos enviados.')
            }

            throw new InternalServerErrorException(`Error al guardar el registro en la base de datos.`);
        }
    }

    /**
     * Método que permite mostrar los registros paginados.
     * @param opciones - Opciones de búsqueda. (página, límite, búsqueda, campo, condición)
     * @returns - Respuesta paginada. (cantidadTotalDeRegistros, paginasTotales, paginaActual, registrosPaginados, registrosRestantes)
     */
    async obtenerRegistrosPaginados(opciones: BuscarRegistrosInterface): Promise<RespuestaPaginadaInterface<T>> {
        const { pagina, limite, busqueda, campo, condicion } = opciones;
        const queryBuilder = this._repositorio.createQueryBuilder();

        // Agregamos la opción de búsqueda si se proporcionó.
        if (busqueda && campo) {
            // Se comprueba si busqueda es un numero o un string.
            if(typeof busqueda === 'number') {
                queryBuilder.where(`${campo} = ${busqueda}`);
            }else {
                queryBuilder.where(`${campo} LIKE :busqueda`, { busqueda: `%${busqueda}%` });
            }
        }

        // Agregamos la condición si se proporcionó.
        if (condicion) {
            queryBuilder.andWhere(condicion);
        }


        // Calcula el número total de registros.
        const cantidadTotalDeRegistros = await queryBuilder.getCount();

        // Calcula la cantidad de páginas necesarias.
        const paginasTotales = Math.ceil(cantidadTotalDeRegistros / limite);

        if (this.validarPaginacion(pagina, limite, paginasTotales)) {
            // Establece el número de registros a omitir y el número de registros a mostrar.
            queryBuilder.skip((pagina - 1) * limite);
            queryBuilder.take(limite);

            // Ordena los resultados por ID de forma ascendente.
            queryBuilder.orderBy(`id`, 'ASC');

            // Se muestran la consulta SQL.
            console.log(queryBuilder.getQuery());

            // Ejecuta la consulta y devuelve un objeto que contiene los registros de la página actual, el número total de registros, la cantidad de páginas necesarias y la cantidad de registros restantes.
            const registrosPaginados = await queryBuilder.getMany();

            return {
                cantidadTotalDeRegistros: cantidadTotalDeRegistros,
                paginasTotales: paginasTotales,
                paginaActual: pagina,
                registrosPaginados: registrosPaginados,
            };
        }
    }

    /**
     * Método que permite actualizar un registro de la base de datos.
     * @param id
     * @param entidadModificada
     */
    async actualizarRegistro(id: string | number, entidadModificada: DeepPartial<T>): Promise<T> {
        /**
         * Se crea una nueva instancia de QueryRunner para poder ejecutar transacciones.
         * Esto es necesario para poder hacer rollback en caso de que ocurra un error.
         */
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        let instanciaHaModificar: T;
        if(typeof id === 'string')  {
            // @ts-ignore
            instanciaHaModificar = await this._repositorio.findOne({ where: { uuid: id } })

        } else{
            // @ts-ignore
            instanciaHaModificar = await this._repositorio.findOne({ where: { id } })
        }

        if (!instanciaHaModificar) throw new NotFoundException(`No se encontró el registro de ${this._repositorio.metadata.tableName} en la base de datos.`);
        try {
            /**
            * Se hace uso del método merge() del repositorio para actualizar los datos del registro.
            */
            instanciaHaModificar = this._repositorio.merge(instanciaHaModificar, entidadModificada);

            /**
            * Se actualiza el registro en la base de datos.
            */
            const updatedInstance = await queryRunner.manager.save(instanciaHaModificar);

            /**
            * Se confirman los cambios en la base de datos.
            */
            await queryRunner.commitTransaction();
            /**
            * Se retorna el registro actualizado.
            */
            return updatedInstance;

        } catch (error) {
            /**
             * Si ocurre un error, se deshacen los cambios en la base de datos.
             */
            await queryRunner.rollbackTransaction();
            /**
             * Se manejan las excepciones que puedan ocurrir.
             */
            throw new InternalServerErrorException('Error al actualizar el registro en la base de datos.');
        } finally {
            /**
             * Se libera el queryRunner. Esto es importante para que la conexión a la base de datos no se mantenga abierta.
             */
            await queryRunner.release();
        }
    }

    /**
     * Método que permite ejecutar un query en la base de datos.
     * @param query - Query a ejecutar.
     */
    async ejecutarQuerySQL(query: string) {
        /**
         * El queryRunner permite ejecutar queries en la base de datos.
         * En este caso, se usa para ejecutar una transacción. Esto permite que si ocurre un error en el
         * proceso, se deshaga lo que se haya hecho.
         *
         * El dataSource permite obtener la conexión a la base de datos y ejecutar queries.
         */
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {
            /**
             * Se realiza la conexión a la base de datos.
             */
            await queryRunner.connect();
            /**
             * Se inicia una transacción. Esto permite que si ocurre un error en el proceso, se deshaga lo que se haya hecho.
             */
            await queryRunner.startTransaction();
            /**
             * Se ejecuta el query que se recibe como parámetro.
             */
            const resultadoDelQuery = await queryRunner.query(query);
            /**
             * Se confirman los cambios en la base de datos.
             */
            await queryRunner.commitTransaction();
            /**
             * Se cierra la conexión a la base de datos.
             */
            await queryRunner.release();
            /**
             * Se devuelve el resultado del query.
             */
            return resultadoDelQuery;
        }catch (e) {
            throw new InternalServerErrorException('Ha ocurrido un error al ejecutar el query.');
        } finally {
            await queryRunner.release();
        }
    }

    public validarPaginacion(pagina: number, limite: number, totalDePaginas:number): boolean {
        if (totalDePaginas === 0){
            throw new BadRequestException('No hay registros en la base de datos');
        }
        if (pagina > totalDePaginas){
            throw new BadRequestException('El número de página debe ser menor o igual al número de páginas');
        }

        if (pagina <= 0 || limite <= 0) {
            throw new BadRequestException('El número de página y el límite deben ser mayores a 0');
        }

        if (pagina > totalDePaginas) {
            throw new BadRequestException('El número de página debe ser menor o igual al número de páginas');
        }

        return true;
    }


}
