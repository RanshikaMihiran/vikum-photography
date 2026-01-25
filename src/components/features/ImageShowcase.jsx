import { SERVICES } from '../../data/constants';

const ImageShowcase = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-serif mb-16">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="group relative overflow-hidden h-[400px] cursor-pointer">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 p-8">
                <h3 className="text-xl font-serif font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ImageShowcase;