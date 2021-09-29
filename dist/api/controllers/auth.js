class AuthController{
    constructor(service){
        this._service = service;

        this.getGoogleAuth = this.getGoogleAuth.bind(this);
        this.getGoogleAuthUri = this.getGoogleAuthUri.bind(this);
    }

    async getGoogleAuth(req, res, next){
        try{
            const url = await this._service.getGoogleAuth();

            res.status(201).redirect(url);
        }catch(err){
            next(err);
        }
    }

    async getGoogleAuthUri(req, res, next){
        try{
            const { code } = req.query;

            const googleUser = await this._service.getGoogleAuthUri(code);

            res.status(201).json({googleUser})
        }catch(err){
            next(err); 
        }
    }
}

module.exports = AuthController;