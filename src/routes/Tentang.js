import React from 'react'
import Sejarah from 'src/pages/Tentang/Sejarah'
import { Switch, Route, Redirect } from "react-router-dom"
import Strukutur from 'src/pages/Tentang/Struktur'
import Sertifikasi from 'src/pages/Tentang/Sertifikasi'
import Visi from 'src/pages/Tentang/Visi'
import Tentang from 'src/pages/Tentang'

const TentangRoute = ({ match }) => {
	return <div className="pr-20 pl-20">
		<Tentang />
		<Switch>
			<Route path={match.url} exact component={() => <Redirect to={`${match.url}/sejarah`} />} />
			<Route path={`${match.url}/sejarah`} exact component={Sejarah} />
			<Route path={`${match.url}/visi`} exact component={Visi} />
			<Route path={`${match.url}/struktur`} exact component={Strukutur} />
			<Route path={`${match.url}/sertifikasi`} exact component={Sertifikasi} />
		</Switch>
	</div>
}

export default TentangRoute