module.exports = function initList(req, res, next) {
	var keystone = req.keystone;
	const {user: {userType, _id: userId}, body = {}, params: {id} = {}} = req
	console.log('hell')
	if (userType !== 'Super Admin' && body.hasOwnProperty('secure') && userId != id) {
		return res.status(400).json({error: 'You don\'t have permission for this operation'});
	}

	req.list = keystone.list(req.params.list);

	const {userType: reqUserType = ''} = body
	if (userType !== 'Super Admin' && reqUserType && userType !== reqUserType) {
		return res.status(400).json({error: 'You can\'t change your user type'});
	}
	if (!req.list) {
		if (req.headers.accept === 'application/json') {
			return res.status(404).json({error: 'invalid list path'});
		}
		req.flash('error', 'List ' + req.params.list + ' could not be found.');
		return res.redirect('/' + keystone.get('admin path'));
	}
	next();
};
