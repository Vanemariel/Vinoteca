import FormProvedores from "./FormProvedores";
import FormProductos from "./FormProductos";

export default function ProvedoresPage() {
  return (
    <div>
      <div className="header">Ingresar producto</div>
      <FormProductos />

      <div className="header">Añadir provedor</div>
      <FormProvedores />
    </div>
  );
}
