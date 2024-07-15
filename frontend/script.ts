import { DataAPIClient, VectorDoc, UUID, SomeDoc } from '@datastax/astra-db-ts';
import { exec } from 'child_process';

// const { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT } = process.env;

const collection_name = 'amc_similarity_full_size'

// // Initialize the client and get a "Db" object
// const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
// const db = client.db(String(ASTRA_DB_API_ENDPOINT));

// console.log(`* Connected to DB ${db.id}`);

// interface Idea extends VectorDoc {
//     idea: string,
// }
  
// (async function () {
//     // Create a collection. The default similarity metric is cosine.
//     // If you're not sure what dimension to set, use the dimension vector
//     // your embeddings model produces.
//     const collection = await db.collection<SomeDoc>(collection_name)

//     const input_string = 'Let $O$ be the center of the circle, $\overline{AB}$ be the chord, and $M$ be the midpoint of $\overline{AB},$ as shown below.[asy] /* Made by MRENTHUSIASM */ size(200); pair O, A, B, M; O = (0,0); A = (-5,5); B = (5,5); M = midpoint(A--B);  draw(Circle(O,5sqrt(2)));  dot("$O$", O, 1.5*S, linewidth(4.5)); dot("$A$", A, 1.5*NW, linewidth(4.5)); dot("$B$", B, 1.5*NE, linewidth(4.5)); dot("$M$", M, 1.5*N, linewidth(4.5)); draw(A--B^^M--O^^A--O^^M--O^^B--O); label("$5$", midpoint(A--M), 1.5*N); label("$5$", midpoint(B--M), 1.5*N); label("$5$", midpoint(O--M), 1.5*E); label("$r$", midpoint(O--A), 1.5*SW); label("$r$", midpoint(O--B), 1.5*SE); [/asy]Note that $\overline{OM}\perp\overline{AB}.$ Since $OM=AM=BM=5,$ we conclude that $\triangle OMA$ and $\triangle OMB$ are congruent isosceles right triangles. It follows that $r=5\sqrt2,$ so the area of $\odot O$ is $\pi r^2=\boxed{\textbf{(B) }50\pi}$'
//     console.log(`* Created collection ${collection.namespace}.${collection.collectionName}`);
// })();

function runPythonScript(param: string) {
    const command = `python script.py ${param}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Output: ${stdout}`);
    });
}

runPythonScript('this is a test function')