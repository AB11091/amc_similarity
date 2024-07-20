# amc_similarity

This site allows American Mathematics Competition (AMC) competitors to search through a database for similar problems based on a search term.

To populate such a database, I scraped the Art of Problem Solving (AOPS) website for past AMC 12 exams (which they have dating back to ~2002). See scraping.ipynb for this process.

It's worth noting that the bank of all AMC 12 questions includes a lot of overlap with AMC 10, so this resource is of use to any high school student (since high school students take either AMC 10 or 12)

After all the data has been scraped, I decided to use vector embeddings and cosine similarity to enable a more sophisticated search than simply an exact string match.

Datastax has a service called AstraDB that makes it very easy to set up a vector database that's already deployed on the cloud.
- I used the NVIDIA-Embed-QA embedding model (that AstraDB provides) which creates 1024-dimensional vectors and cosine similarity for the search method
- I embedded the solution text of each problem, and added each vector to the database along with relevant metadata (i.e. Year, Problem #, URL)
- Now I can take a string input, embed it, and return the top 10 closest vectors, which now come with the metadata

app.py is a very basic Flask backend hooked up to a simple tailwind.css frontend with javascript functions to send the search term to AstraDB, and update the page with the closest results
