import * as entidades from '../../entities';
import * as abstract from './';

export abstract class IConexionDb {
    public abstract imagen: abstract.IImagenRepository<entidades.ImagenEntity>;
    public abstract parametro: abstract.IParametroRepository<entidades.ParametroEntity>;
    public abstract permisoModulo: abstract.IPermisoModuloRepository<entidades.PermisoModuloEntity>;
    public abstract permisoParametro: abstract.IPermisoParametroRepository<entidades.PermisoParametroEntity>;
    public abstract permisoParametroRuta: abstract.IPermisoParametroRutaRepository<entidades.PermisoParametroRutaEntity>;
    public abstract permisoRol: abstract.IPermisoRolRepository<entidades.PermisoRolEntity>;
    public abstract permiso: abstract.IPermisoRepository<entidades.PermisoEntity>;
    public abstract permisoRuta: abstract.IPermisoRutaRepository<entidades.PermisoRutaEntity>;
    public abstract registroDeAcceso: abstract.IRegistroDeAccesoRepository<entidades.RegistroDeAccesoEntity>;
    public abstract usuario: abstract.IUsuarioRepository<entidades.UsuarioEntity>;
    public abstract valorParametro: abstract.IValorParametroRepository<entidades.ValorParametroEntity>;
    public abstract libro: abstract.ILibroRepository<entidades.LibroEntity>;
    public abstract inventario: abstract.IInventarioRepository<entidades.InventarioEntity>;
}
