import { type FC } from 'react';

export const Footer: FC = () => {
  const sections = [
    {
      title: 'Compañía',
      links: ['Nosotros', 'Nuestros Servicios', 'Política De Privacidad', 'Afíliate'],
    },
    {
      title: 'Ayuda',
      links: ['Preguntas', 'Compras', 'Envíos', 'Estatus De Orden', 'Pago'],
    },
    {
      title: 'Tienda',
      links: ['Credito', 'Tarjetas', 'Cuentas'],
    },
  ];

  return (
    <div className="bg-[#24262b] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-white text-lg font-medium capitalize mb-9 relative after:content-[''] after:left-0 after:-bottom-2 after:bg-[#00d2ff] after:h-0.5 after:w-12">
                {section.title}
              </p>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#bbbbbb] text-base capitalize hover:text-white hover:pl-2 transition-all duration-300 block">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
