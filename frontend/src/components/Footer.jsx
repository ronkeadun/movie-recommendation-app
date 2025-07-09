const Footer = () => {
  return (
    <div className="text-white bg-black mt-4.5 md:px-10 text-center">
      <div className="py-10">
        <p>Developed by Aderonke Fadare</p>
      </div>
      <p className="pb-5">Questions? Contact us:</p>

      <div className="grid grid-cols-2 md:grid-cols-4 text-sm pb-10 max-w-5xl text-center">
        <a href="ronkeadun1@yahoo.com" className="hover:text-[#e50914]">E-mail <i className="fa fa-envelope p-3"></i></a>
        <a href="https:/m.facebook.com/help" className="hover:text-[#e50914]">Facebook <i className="fab fa-facebook p-3"></i></a>
        <a href="https://help.instagram.com" className="hover:text-[#e50914]">Instagram <i className="fab fa-instagram p-3"></i></a>
      </div>
    </div>
  );
};

export default Footer;