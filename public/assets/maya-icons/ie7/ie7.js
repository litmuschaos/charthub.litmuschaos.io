/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'maya-icons\'">' + entity + '</span>' + html;
	}
	var icons = {
		'mi-link': '&#xe947;',
		'mi-disable': '&#xe945;',
		'mi-view': '&#xe944;',
		'mi-table': '&#xe943;',
		'mi-add-user': '&#xe93d;',
		'mi-share': '&#xe942;',
		'mi-container': '&#xe940;',
		'mi-Group-4-Copy': '&#xe946;',
		'mi-filter': '&#xe93b;',
		'mi-star': '&#xe93c;',
		'mi-arrow-up-down': '&#xe93e;',
		'mi-user': '&#xe941;',
		'mi-loader': '&#xe932;',
		'mi-hamburger': '&#xe92d;',
		'mi-circle-add': '&#xe90b;',
		'mi-circle-minus': '&#xe928;',
		'mi-clock1': '&#xe92b;',
		'mi-rocket-share': '&#xe90a;',
		'mi-settings': '&#xe93a;',
		'mi-tree-network': '&#xe92a;',
		'mi-chevrons-right': '&#xe904;',
		'mi-chevrons-left': '&#xe914;',
		'mi-chevron-right': '&#xe933;',
		'mi-chevron-left': '&#xe934;',
		'mi-chevron-up': '&#xe935;',
		'mi-chevron-down': '&#xe937;',
		'mi-x': '&#xe916;',
		'mi-user-switch': '&#xe938;',
		'mi-application': '&#xe901;',
		'mi-mail': '&#xe900;',
		'mi-check-list': '&#xe902;',
		'mi-file': '&#xe903;',
		'mi-bell': '&#xe905;',
		'mi-play-square': '&#xe906;',
		'mi-logs': '&#xe907;',
		'mi-dashboard': '&#xe936;',
		'mi-search': '&#xe908;',
		'mi-alert-triangle': '&#xe909;',
		'mi-slack': '&#xe90c;',
		'mi-align-left': '&#xe90d;',
		'mi-arrow-right-curve': '&#xe90e;',
		'mi-arrow-left-curve': '&#xe90f;',
		'mi-key': '&#xe910;',
		'mi-cloud-reload': '&#xe911;',
		'mi-cloud-up-down': '&#xe912;',
		'mi-eye': '&#xe913;',
		'mi-circle-info': '&#xe915;',
		'mi-check-circle': '&#xe917;',
		'mi-id-card': '&#xe918;',
		'mi-lightbulb': '&#xe919;',
		'mi-x-circle': '&#xe91a;',
		'mi-home': '&#xe91b;',
		'mi-check-square': '&#xe91c;',
		'mi-database': '&#xe91d;',
		'mi-form': '&#xe91e;',
		'mi-litmus': '&#xe91f;',
		'mi-arrow-down-circle': '&#xe920;',
		'mi-arrow-up-circle': '&#xe921;',
		'mi-arrow-right-circle': '&#xe922;',
		'mi-arrow-left-circle': '&#xe923;',
		'mi-book': '&#xe924;',
		'mi-plug-connect': '&#xe925;',
		'mi-ellipsis-horizontal': '&#xe926;',
		'mi-ellipsis-vertical': '&#xe927;',
		'mi-edit': '&#xe929;',
		'mi-clipboard-pen': '&#xe92c;',
		'mi-trash': '&#xe939;',
		'mi-chart-bar-up': '&#xe92e;',
		'mi-frequency': '&#xe92f;',
		'mi-cluster': '&#xe931;',
		'mi-clock': '&#xe930;',
		'mi-upgrade': '&#xe93f;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/mi-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
