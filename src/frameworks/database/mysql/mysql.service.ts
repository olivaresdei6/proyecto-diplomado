import { Injectable } from "@nestjs/common";
import * as abstract from "./core/abstract";
import * as entidades from "./entities";
import * as repositorios from "./repositories";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
@Injectable()
export class MySQLBaseDeDatosService implements abstract.IConexionDb{
    public imagen: abstract.IImagenRepository<entidades.ImagenEntity>;
    public parametro: abstract.IParametroRepository<entidades.ParametroEntity>;
    public permisoModulo: abstract.IPermisoModuloRepository<entidades.PermisoModuloEntity>;
    public permisoParametro: abstract.IPermisoParametroRepository<entidades.PermisoParametroEntity>;
    public permisoParametroRuta: abstract.IPermisoParametroRutaRepository<entidades.PermisoParametroRutaEntity>;
    public permisoRol: abstract.IPermisoRolRepository<entidades.PermisoRolEntity>;
    public permiso: abstract.IPermisoRepository<entidades.PermisoEntity>;
    public permisoRuta: abstract.IPermisoRutaRepository<entidades.PermisoRutaEntity>;
    public registroDeAcceso: abstract.IRegistroDeAccesoRepository<entidades.RegistroDeAccesoEntity>;
    public usuario: abstract.IUsuarioRepository<entidades.UsuarioEntity>;
    public valorParametro: abstract.IValorParametroRepository<entidades.ValorParametroEntity>;
    public libro: abstract.ILibroRepository<entidades.LibroEntity>;
    public inventario: abstract.IInventarioRepository<entidades.InventarioEntity>;

    constructor(
        @InjectRepository(entidades.ImagenEntity) private readonly imagenRepository: Repository<entidades.ImagenEntity>,
        @InjectRepository(entidades.ParametroEntity) private readonly parametroRepository: Repository<entidades.ParametroEntity>,
        @InjectRepository(entidades.PermisoModuloEntity) private readonly permisoModuloRepository: Repository<entidades.PermisoModuloEntity>,
        @InjectRepository(entidades.PermisoParametroEntity) private readonly permisoParametroRepository: Repository<entidades.PermisoParametroEntity>,
        @InjectRepository(entidades.PermisoParametroRutaEntity) private readonly permisoParametroRutaRepository: Repository<entidades.PermisoParametroRutaEntity>,
        @InjectRepository(entidades.PermisoRolEntity) private readonly permisoRolRepository: Repository<entidades.PermisoRolEntity>,
        @InjectRepository(entidades.PermisoEntity) private readonly permisoRolModuloRutaRepository: Repository<entidades.PermisoEntity>,
        @InjectRepository(entidades.PermisoRutaEntity) private readonly permisoRutaRepository: Repository<entidades.PermisoRutaEntity>,
        @InjectRepository(entidades.RegistroDeAccesoEntity) private readonly registroDeAccesoRepository: Repository<entidades.RegistroDeAccesoEntity>,
        @InjectRepository(entidades.UsuarioEntity) private readonly usuarioRepository: Repository<entidades.UsuarioEntity>,
        @InjectRepository(entidades.ValorParametroEntity) private readonly valorParametroRepository: Repository<entidades.ValorParametroEntity>,
        @InjectRepository(entidades.LibroEntity) private readonly libroRepository: Repository<entidades.LibroEntity>,
        @InjectRepository(entidades.InventarioEntity) private readonly inventarioRepository: Repository<entidades.InventarioEntity>,
        private readonly conexion: DataSource,
    ){}

    public async onApplicationBootstrap(){
        this.imagen = new repositorios.MySQLImagenRepository(this.imagenRepository, this.conexion);
        this.parametro = new repositorios.MySQLParametroRepository(this.parametroRepository, this.conexion);
        this.permisoModulo = new repositorios.MySQLPermisoModuloRepository(this.permisoModuloRepository, this.conexion);
        this.permisoParametro = new repositorios.MySQLPermisoParametroRepository(this.permisoParametroRepository, this.conexion);
        this.permisoParametroRuta = new repositorios.MySQLPermisoParametroRutaRepository(this.permisoParametroRutaRepository, this.conexion);
        this.permisoRol = new repositorios.MySQLPermisoRolRepository(this.permisoRolRepository, this.conexion);
        this.permiso = new repositorios.MySQLPermisoRepository(this.permisoRolModuloRutaRepository, this.conexion);
        this.permisoRuta = new repositorios.MySQLPermisoRutaRepository(this.permisoRutaRepository, this.conexion);
        this.registroDeAcceso = new repositorios.MySQLRegistroDeAccesoRepository(this.registroDeAccesoRepository, this.conexion);
        this.usuario = new repositorios.MySQLUsuarioRepository(this.usuarioRepository, this.conexion);
        this.valorParametro = new repositorios.MySQLValorParametroRepository(this.valorParametroRepository, this.conexion);
        this.libro = new repositorios.MysqlLibroRepository(this.libroRepository, this.conexion);
        this.inventario = new repositorios.MysqlInventarioRepository(this.inventarioRepository, this.conexion);
    }

}
