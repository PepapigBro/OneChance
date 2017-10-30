using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OneChance.Models
{
    public class DistinctCityComparer: IEqualityComparer<City> 
    {
        public bool Equals(City x, City y)
        {
            return x.title_ru == y.title_ru
                && x.country_id == y.country_id;
        }

        public int GetHashCode(City obj)
        {
            return obj.title_ru.GetHashCode() ^
                obj.country_id.GetHashCode();
        }
    }
}