import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dataSource from '../config/db';
import { CountryResolver } from './resolvers/Country';
import { Country } from './entities/country';

const start = async () => {
    await dataSource.initialize();

    // Create countries
    const countries = await Country.find();
    if (countries.length < 4) {
        const france = new Country();
        france.code = 'FR';
        france.name = 'France';
        france.emoji = '🇫🇷';
        france.continent = 'Europe';
        france.save();

        const belgium = new Country();
        belgium.code = 'BE';
        belgium.name = 'Belgium';
        belgium.emoji = '🇧🇪';
        belgium.continent = 'Europe';
        belgium.save();

        const andorra = new Country();
        andorra.code = 'AD';
        andorra.name = 'Andorra';
        andorra.emoji = '🇦🇩';
        andorra.continent = 'Europe';
        andorra.save();

        const vietnam = new Country();
        vietnam.code = 'VN';
        vietnam.name = 'Vietnam';
        vietnam.emoji = '🇻🇳';
        vietnam.continent = 'Asia';
        vietnam.save();
    }

    const schema = await buildSchema({
        resolvers: [CountryResolver]
    });

    const server = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 8000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
};

start();
