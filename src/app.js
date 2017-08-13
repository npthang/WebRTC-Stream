const playVideo = require('./playVideo');
const Peer = require('simple-peer');
const $ = require('jquery');
const openStream = require('./openStream');

openStream(function(stream){
	playVideo(stream, 'localStream')
	const p = new Peer({ initiator: location.hash === '#1', trickle: false, stream });

	p.on('signal', token => {
		$('#txtSignal').val(JSON.stringify(token)); 		// sinh ra offer token
	});

	p.on('connect', () => {
		console.log('connected');
	});

	$('#btnConnect').click(() => {
		const friendSignal = JSON.parse($('#txtFriendSignal').val());
		p.signal(friendSignal);			// sinh ra answers token  --> connected!!
	});

	p.on('stream', friendStream => playVideo(stream, 'friendStream'));
});
