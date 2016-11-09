# sync json data to mongo db
mongoimport --db calc2 --collection hospitals  --file v18.json -v

# export to json
mongoexport --db calc2 --collection hospitals --out v18.json