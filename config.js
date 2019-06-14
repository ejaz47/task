

module.exports = {
    env: 'dev',
    secret : "asupersecretvalue",
    mongo: {
    	dev: {
    		url: '** Mongo db url **'
    	},
    	pro: {
    		url: '** Mongo db url **'
    	}
    },
    mysql: {
	    dev :{
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'Dbname'
		},
		pro: {
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'Dbname'
		}
    },
};
