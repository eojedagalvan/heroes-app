import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm/useForm';
import { getHeroByName } from '../../selectors/getHerobyName';
import { HeroCard } from '../heroes/HeroCard';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse( location.search );

    const [ formValues , handleInputChange ] = useForm({
        search: q
    });
    
    const { search } = formValues;

    const heroesFiltered = useMemo(() => getHeroByName( q ), [ q ])
    
    const handleSearch = (e) => {
        
        e.preventDefault();
        history.push(`?q=${ search }`);
        
    }

    return (
        <div>
            <h1>SearcScreen</h1>
            <hr />

            <div className="row">
                
                <div className="col-5">
                    <h4> Search Form</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            value={ search }
                            onChange={ handleInputChange }
                            name="search"
                            autoComplete="off"
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary mt-3"
                        >
                            Search
                        </button>

                    </form>
                </div>

                <div className="col-7">

                    <h4>Results</h4>
                    <hr />

                    {
                    ( q === '' ) 
                            && 
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

{
                    ( q !== '' && heroesFiltered.length === 0) 
                            && 
                            <div className="alert alert-danger">
                                There is not a hero with { q }
                            </div>
                    }

                    {
                        heroesFiltered.map( hero =>(
                            <div className="animate__animated animate__fadeIn" key={ hero.id }>
                                <HeroCard
                                    { ...hero }
                                />
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
