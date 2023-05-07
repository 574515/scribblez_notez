import React from 'react';
import Facebook from '../assets/img/facebook.svg'
import Git from '../assets/img/git.svg';
import Instagram from '../assets/img/instagram.svg';
import LinkedIn from '../assets/img/linkedin.svg';
import Twitter from '../assets/img/twitter.svg';

const Footer = () => {
	return (
			<footer className="text-center text-white">
				<div className="p-2">
					<section className="my-2">
						<a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://facebook.com" target="_blank" role="button" data-mdb-ripple-color="dark" rel="noreferrer">
							<img src={Facebook} alt=""/>
						</a>
						<a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://github.com/574515" target="_blank" role="button" data-mdb-ripple-color="dark" rel="noreferrer">
							<img src={Git} alt=""/>
						</a>
						<a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://instagram.com" target="_blank" role="button" data-mdb-ripple-color="dark" rel="noreferrer">
							<img src={Instagram} alt=""/>
						</a>
						<a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://linkedin.com" target="_blank" role="button" data-mdb-ripple-color="dark" rel="noreferrer">
							<img src={LinkedIn} alt=""/>
						</a>
						<a className="btn btn-link btn-floating btn-lg text-dark m-1" href="https://twitter.com" target="_blank" role="button" data-mdb-ripple-color="dark" rel="noreferrer">
							<img src={Twitter} alt=""/>
						</a>
					</section>
				</div>
				<div className="text-center text-dark">&copy; 2023 Web Programming</div>
			</footer>
	);
};

export default Footer;