import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Country } from '../entities/country';

@Resolver()
export class CountryResolver {

    @Mutation(() => Country)
    async addCountry(
        @Arg('code') code: string,
        @Arg('name') name: string,
        @Arg('emoji') emoji: string,
        @Arg('continent') continent: string
    ): Promise<Country> {
        const country = Country.create({ code, name, emoji, continent });
        return await Country.save(country);
    }

    @Query(() => [Country])
    async countries(): Promise<Country[]> {
        return await Country.find();
    }

    @Query(() => Country)
    async countryByCode(@Arg('code') code: string): Promise<Country | undefined> {
        return await Country.findOneByOrFail({ code: code });
    }

    @Query(() => [Country])
    async countriesByContinent(@Arg('continent') continent: string): Promise<Country[]> {
        return await Country.find({ where: { continent } });
    }
}
