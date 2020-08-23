import React, { useEffect } from 'react';
import HomeRoute from './Home';
import TentangRoute from './Tentang';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import AkademikRoute from './Akademik';
import Fasilitas from 'src/pages/Home/Fasilitas';
import { useDispatch } from 'react-redux';
import actionsWeb from 'src/redux/actions/web';
import Article from 'src/pages/Article';
import InformasiBerita from 'src/pages/Home/InformasiBerita';
// import Article from 'src/pages/Article';

const Routes = ({ className }) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { pathname } = window.location

	const effect = () => {
		if (pathname === '/')
			history.push('/home')
		history.listen(() => {
			// window.scrollTo({ top: 0, behavior: 'smooth' })
			dispatch(actionsWeb({ noBanner: false, noFooter: false }))
		})
	}

	useEffect(effect, [])

	return <div className={className}>
		<Switch>
			<Route path="/home" component={HomeRoute} />
			<Route path="/tentang" component={TentangRoute} />
			<Route path="/akademik" component={AkademikRoute} />
			<Route path="/fasilitas" component={Fasilitas} />
			<Route path="/info" render={() => <Redirect to="/info/berita" />} exact />
			<Route path="/info/berita" component={InformasiBerita} />
			<Route path="/info/career" component={() => { }} />
			<Route path="/pendaftaran" component={() => <div className="ai-c flex flex-col p-15">
				<h4>Formulir Pendaftaran</h4>
				<div className="flex w-2/3 mt-3 brd-5 b-1 p-5 flex-col">
					<div className="flex mb-3 ai-c">
						<div className="flex flex-1">Nama Lengkap<i style={{ color: 'red' }}>*</i></div>
						<div className="flex flex-1">
							<input className="brd-3 b-1 p-4 mb-3 flex-1" />
						</div>
					</div>
					<div className="flex mb-3 ai-c">
						<div className="flex flex-1">Tanggal Lahir<i style={{ color: 'red' }}>*</i></div>
						<div className="flex flex-1">
							<input className="brd-3 b-1 p-4 mb-3 flex-1" />
						</div>
					</div>
					<div className="flex mb-3 jc-fe">
						<button className="p-2 pl-20 pr-20 brd-3 c-light bc-link">DAFTAR</button>
					</div>
				</div>
			</div>} />
			<Route path="/training" component={() => <div className="flex flex-1 jc-c p-30 f-10 c-grey-hard">Halaman Training center</div>} />
			<Route path="/404" component={() => <div className="flex flex-1 jc-c p-30 f-30 c-grey-hard">404</div>} />
			<Route path="/:url" component={Article} />
		</Switch>
	</div>
}

export default Routes