class SubscribtionMiddleware {
  constructor({ db, ApiError }) {
    this.db = db;
    this.apiError = ApiError;
  }

  refreshStatus = async (request, response, next) => {
    try {
      let dateOfDay = Date.now();
      const subscribtions = await this.db.Subscribtion.findAll({
        where: { userId: request.params.id }
      });
      subscribtions.map((subscribtion) => {
        // FINISHED STATUS
        if (dateOfDay > new Date(subscribtion.dataValues.endDate)) {
          this.db.Subscribtion.update(
            { status: 'finished' },
            {
              where: { id: subscribtion.dataValues.id }
            }
          );
        } else if (dateOfDay < new Date(subscribtion.dataValues.beginingDate)) {
          // PENDING STATUS
          this.db.Subscribtion.update(
            { status: 'pending' },
            {
              where: { id: subscribtion.dataValues.id }
            }
          );
        } else if (
          dateOfDay > new Date(subscribtion.dataValues.beginingDate) &&
          dateOfDay < new Date(subscribtion.dataValues.beginingDate)
        ) {
          // ACTIVE STATUS
          this.db.Subscribtion.update(
            { status: 'active' },
            {
              where: { id: subscribtion.dataValues.id }
            }
          );
        }
      });
      next();
    } catch (err) {
      next(err);
    }
  };
}

export default SubscribtionMiddleware;
