import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ className, ...props }) => {
	const { data: UI } = useSelector(state => state.UI)
	const [subMenuOpen, setSubMenuOpen] = useState({})

	const openSubMenu = (id) => {
		let menu = {}
		let parent = id.split('-').filter(a => a !== "").map(a => a + "-")
		parent.forEach((a, i) => {
			parent[i] = (parent[i - 1] || "") + parent[i]
			menu[parent[i]] = true
		})
		setSubMenuOpen({ ...menu })
	}

	const NavBar = (arr, id = "", prevPath = "") => {
		const Menu = id === ""
		return arr.map(
			({ name, path, subMenu }, i) => {
				const viewId = (id + name + "-").replace(/\s/g, '')
				const viewPath = prevPath + path
				return subMenu ?
					<div className="menu flex flex-1 relative as-c" key={i}>
						<Link className={`${Menu && 'jc-c'} relative flex ai-c jc-sb flex flex-1 link ${window.location.href.includes(viewPath) && 'active'}`} onMouseEnter={() => openSubMenu(viewId)} to={viewPath}>
							<div>{name}</div>
							{!Menu && <i className="ml-3 c-grey fa fa-chevron-right" />}
							{/* {Menu && subMenuOpen[viewId] && <i style={{ bottom: -5 }} className="f-5 absolute ml-3 c-grey fa fa-chevron-up" />} */}
						</Link>
						<div className={`sub-menu ${Menu && 'tail'}`} style={{ display: subMenuOpen[viewId] ? 'block' : 'none' }}>
							{NavBar(subMenu, viewId, viewPath)}
						</div>
					</div> :
					<div className="menu flex flex-1 relative as-c" key={i}>
						<Link className={`${Menu && 'jc-c'} flex flex-1 link ${window.location.href.includes(viewPath) && 'active'}`} onMouseEnter={() => openSubMenu(viewId)} to={viewPath}>{name}</Link>
					</div>
			}
		)
	}

	return <div id="header" {...props} className={`w-full jc-sb flex bg-white ${className}`}>
		{Object.keys(subMenuOpen).length > 0 && <div className="black" onMouseEnter={() => setSubMenuOpen({})} />}
		<div className="w-1/3">
			<img className="h-full w-auto" alt="" src={require('src/assets/images/logo-tau.png')} />
		</div>
		{/* <div className="mr-20" /> */}
		<div className="flex w-2/3">
			{UI.nav && NavBar(UI.nav)}
		</div>
	</div>
}

export default Header