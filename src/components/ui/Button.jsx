import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Button = ({ text, to, variant = 'primary' }) => {
  const baseStyles = "inline-flex items-center gap-2 px-8 py-3 text-sm font-bold tracking-widest uppercase transition-all duration-300";
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    outline: "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
  };

  return (
    <Link to={to} className={`${baseStyles} ${variants[variant]}`}>
      {text} <ArrowRight size={16} />
    </Link>
  );
};

export default Button;