import db from '../models/sqlModel.js';

const providerController = {};

providerController.getProviderNames = async (req, res, next) => {
  try {
    const names = await db.query(
      `SELECT first_name, last_name, provider_id FROM providers`,
    );
    const formatted = names.rows.map(result => {
      return {
        provider_name: result.first_name + ' ' + result.last_name,
        provider_id: result.provider_id,
      };
    });
    res.locals.appointments['provider_names'] = formatted;
    return next();
  } catch (error) {
    console.log(error);
  }
};
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

    const queryStr = `INSERT INTO providers VALUES ('${provider_id}', '${first_name}', '${last_name}', '${specialty}', '${street_address}', '${city}', '${state}', '${zipcode}', '${phone}');`;

    //query database
    await db.query(queryStr);

    res.locals.newProvider = 'Provider added to database.';
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
    const { provider_id } = req.query;
    if (!provider_id)
      return next({
        log: 'Error in providerController deleteProvider. Invalid request.',
        status: 400,
        message: {
          err: 'Invalid request: Please provide a provider identifier for the provider you wish to delete.',
        },
      });

    await db.query(
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
    const { provider_id } = req.params;
    if (!req.body)
      return next({
        log: 'Error in providerController modifyProvider. Invalid request, must include modifications to provider.',
        status: 400,
        message:
          'Invalid request: Must include provider identifier to modify the provider in the database.',
      });

    const attributesToUpdate = Object.entries(req.body);

    //builds columns and updated values for query string
    let queryStr = attributesToUpdate
      .map(([key, value]) => `${key} = '${value}', `)
      .join('');

    //removes comma at the end
    queryStr = queryStr.slice(0, -2);

    await db.query(
      `UPDATE providers SET ${queryStr} WHERE provider_id = '${provider_id}';`,
    );

    res.locals.updatedProvider = 'Provider updated in database.';
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
    const { provider_id } = req.params;

    const provider = await db.query(
      `SELECT * FROM providers WHERE provider_id = '${provider_id}';`,
    );

    res.locals.provider = provider.rows;
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
    res.locals.allProviders = allProviders.rows;
    console.log(res.locals.allProviders);
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
export default providerController;
