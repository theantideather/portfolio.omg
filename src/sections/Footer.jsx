const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
      <div className="text-white-500 flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>

      <div className="flex gap-3">
        <a href="https://github.com/theantideather" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
        </a>
        <a href="https://twitter.com/omargohar" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src="/assets/twitter.svg" alt="twitter" className="w-1/2 h-1/2" />
        </a>
        <a href="https://t.me/theantideather" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src="/assets/telegram.svg" alt="telegram" className="w-1/2 h-1/2" />
        </a>
        <a href="https://instagram.com/theantideather" target="_blank" rel="noopener noreferrer" className="social-icon">
          <img src="/assets/instagram.svg" alt="instagram" className="w-1/2 h-1/2" />
        </a>
      </div>

      <p className="text-white-500">© 2024 Om.G. All rights reserved. <a href="https://t.me/theantideather" className="text-primary hover:text-white transition-colors">@theantideather</a></p>
    </footer>
  );
};

export default Footer;
