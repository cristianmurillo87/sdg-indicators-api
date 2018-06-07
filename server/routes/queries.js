const queries = {
    getGoals : "select sdg_code id, sdg_title title, sdg_desc description from goals",
    getGoalById : "select sdg_code id, sdg_title title, sdg_desc description from goals where sdg_code = $1",
    getTargetsByGoal : "select a.sdg_code id, a.sdg_title title, a.sdg_desc description, array_to_json(array_agg(row_to_json(d))) targets from goals a, (select tg_id, sdg_code, tg_desc from targets) d where a.sdg_code = d.sdg_code and a.sdg_code = $1 group by a.sdg_code, a.sdg_title, a.sdg_desc",
    getTargetById : "select tg_id id, sdg_code goal, tg_desc description from targets where tg_id=$1",
    getIndicatorsByGoal : "select a.sdg_code goal, a.sdg_title title, array_to_json(array_agg(row_to_json(c))) indicators from goals a, targets b, (select tg_id target, indicator_ref indicator, indicator_desc description from indicators) c where a.sdg_code=$1 and b.sdg_code=$1 and b.sdg_code=a.sdg_code and b.tg_id = c.target group by  a.sdg_code, a.sdg_title",
    getIndicatorsByTarget : "select a.tg_id target, a.sdg_code goal, a.tg_desc description, array_to_json(array_agg(row_to_json(d))) indicators from targets a, (select tg_id target, indicator_ref indicator, indicator_desc description from indicators) d where a.tg_id = d.target and a.tg_id=$1 group by a.tg_id, a.sdg_code, a.tg_desc",
    getIndicatorById : "select tg_id target, indicator_ref indicator, indicator_desc description from indicators where indicator_ref=$1",
    getSeriesByIndicator : "select a.indicator_ref indicator, a.indicator_desc description, array_to_json(array_agg(row_to_json(b))) series from indicators a, (select indicator_ref indicator, series_code series, series_desc description, unit from series) b where a.indicator_ref = b.indicator and a.indicator_ref=$1 group by a.indicator_ref, a.indicator_desc",
    getYearsForSeries : "select a.series_code, array_to_json(d.years) years from series_country a, (select array_agg(distinct(s_year)) years from series_country where series_code=$1) d where a.series_code = $1 group by a.series_code, d.years",
    getAgesForSeries : "select c.series_code, c.s_year _year, array_to_json(array_agg(distinct(d))) age_groups from series_country c, (select b.id, b.age_group from series_country a, age_groups b where a.age_group_id=b.id and a.s_year=$2 and a.series_code=$1 group by b.id, b.age_group) d where c.series_code = $1 and c.s_year=$2 group by c.series_code, c.s_year",
    getGendersForSeries : "select c.series_code, c.s_year _year, e.age_group,array_to_json(array_agg(distinct(d))) genders from series_country c, (select b.g_id id, b.gender from series_country a, genders b where a.g_id=b.g_id and a.s_year=$2 and a.series_code=$1 and a.age_group_id=$3 group by b.g_id, b.gender) d, age_groups e where c.series_code = $1 and c.s_year=$2 and c.age_group_id=e.id and c.age_group_id=$3 group by c.series_code, c.s_year, e.age_group",
    getGeoJSONData : "select row_to_json(fc) _data from (select 'FeatureCollection' as type, array_to_json(array_agg(features)) features from (select  'Feature' as type, row_to_json(props) properties, st_asgeojson(st_transform(loc.the_geom, 3857))::json geometry from countries loc inner join (select b.name country, b.country_code, a.s_value _value from series_country a inner join countries2 b on a.country_code=b.country_code where a.series_code=$1 and a.s_year=$2 and a.age_group_id=$3 and g_id=$4) props on loc.country_code=props.country_code group by loc.the_geom, props) features) fc",
    getCountries : "select row_to_json(fc) countries from (select 'FeatureCollection' as type, array_to_json(array_agg(features)) features from (select  'Feature' as type, row_to_json(props) properties, st_asgeojson(st_transform(loc.the_geom, 3857))::json geometry from countries loc inner join (select name country, country_code from countries2) props on loc.country_code=props.country_code group by loc.the_geom, props) features) fc",
    getSeriesData : "select a.s_year _year, max(a.s_value) _value from series_country a where a.series_code=$1 and a.age_group_id=$3 and g_id=$4 and country_code=$2 group by a.s_year order by a.s_year"
}

module.exports = queries;