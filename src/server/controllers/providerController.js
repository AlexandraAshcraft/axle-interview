const { db } = require('../models/sqlModel');

const providerController = {};

providerController.createProvider = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      specialty,
      street_address,
      city,
      state,
      zipcode,
      phone,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !specialty ||
      !street_address ||
      !city ||
      !state ||
      !zipcode ||
      !phone
    ) {
      return next({
        log: 'Invalid request, all fields are required to create a provider in the database.',
        status: 400,
        message:
          'Invalid request, all fields are required to create a provider in the database.',
      });
    }
    const provider_id = last_name + phone;

    const newProvider = await db.query(
      `INSERT INTO providers VALUES ('${provider_id}', '${first_name}', '${last_name}', '${specialty}', '${street_address}', '${city}', '${state}', '${zipcode}', '${phone}');`,
    );

    res.locals.newProvider = newProvider;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in providerController createProvider when creating provider in database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not create provider in database.' },
    });
  }
};

providerController.deleteProvider = async (req, res, next) => {
  try {
    const { provider_id } = req.body;
    if (!provider_id)
      return next({
        log: 'Error in providerController deleteProvider. Invalid request.',
        status: 400,
        message: {
          err: 'Invalid request: Please provide a provider identifier for the provider you wish to delete.',
        },
      });

    const deletedProvider = await db.query(
      `DELETE FROM providers WHERE provider_id = '${provider_id}';`,
    );

    res.locals.deletedProvider = 'Provider deleted.';
    next();
  } catch (error) {
    return next({
      log: {
        'Error in providerController deleteProvider when fetching provider from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not delete provider from database.' },
    });
  }
};
providerController.modifyProvider = async (req, res, next) => {
  try {
    const updates = {
      provider_id: req.body.provider_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      specialty: req.body.specialty,
      street_address: req.body.street_address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      phone: req.body.phone,
    };
    if (!updates[provider_id])
      return next({
        log: 'Error in providerController modifyProvider. Invalid request, must include provider identifier.',
        status: 400,
        message:
          'Invalid request: Must include provider identifier to modify the provider in the database.',
      });

    const updatedAttributes = Object.entries().filter(
      (key, value) => key !== null && key !== undefined,
    );
    console.log('updatedAttributes', updatedAttributes);

    const queryStr = '';

    //builds columns and updated values for query string
    updatedAttributes.forEach(attribute => {
      queryStr + `${attribute[0]} = '${attribute[1]}',`;
    });

    //removes comma at the end
    queryStr = queryStr.slice(-1);

    const updatedProvider = await db.query(
      `UPDATE providers SET ${queryStr} WHERE provider_id = '${updates.provider_id}';`,
    );

    res.locals.updatedProvider = updatedProvider;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in providerController modifyProvider when modifying provider data in database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not modify provider data in database.' },
    });
  }
};

providerController.getProviderById = async (req, res, next) => {
  try {
    const { provider_id } = req.body;
    if (!provider_id)
      return next({
        log: 'Error in providerController getProviderById. Invalid request.',
        status: 400,
        message: {
          err: 'Invalid request: Please include provider identifier.',
        },
      });

    const provider = await db.query(
      `SELECT * FROM providers WHERE provider_id = '${provider_id}';`,
    );

    res.locals.provider = provider;
    next();
  } catch (error) {
    return next({
      log: {
        'Error in providerController getProviderById when fetching provider from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not fetch provider from database' },
    });
  }
};
providerController.getAllProviders = async (_req, res, next) => {
  try {
    const allProviders = await db.query(`SELECT * FROM providers;`);

    res.locals.allProviders = allProviders;
    return next();
  } catch (error) {
    return next({
      log: {
        'Error in providerController getAllProviders when fetching providers from database: ':
          error,
      },
      status: 500,
      message: { err: 'Could not fetch providers from database.' },
    });
  }
};

providerController.fetchData = async (req, res, next) => {
  try {
    const data = await fetch('');
    const parsedData = data.map();
    res.locals.data = parsedData;
    return next();
  } catch (error) {
    return next({
      log: 'Error caught in providerController fetchData',
      error,
      status: 500,
      message: {
        err: 'An error occurred when fetching data from the database.',
      },
    });
  }
};

module.exports = providerController;
