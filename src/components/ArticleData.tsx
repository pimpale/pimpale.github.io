import parse from 'date-fns/parse'
// this component dos nothing but export the data
// of all the articles written. Pls update it when new article is written
// Article lists all around the site will be changed.

export type Article = {
    name: string,
    url: string,
    published: Date,
    listed: boolean,
}

export const articleData:Map<string, Article> = new Map([
    ["terraingeneration1", {
        name:"Terrain Generation 1 - Donut World Topology",
        url: '../terraingeneration1.html',
        published: parse("Jun 2021", "MMM y", new Date()),
        listed: true,
    }],
    ["fluid1", {
        name:"Fluid Simulation 1 - Learning WebGL with Heat Transfer Simulation",
        url: '../fluid1.html',
        published: parse("Feb 2022", "MMM y", new Date()),
        listed: true,
    }],
    ["fluid2", {
        name:"Fluid Simulation 2 - WebGL Fluid Simulation from Scratch!",
        url: '../fluid2.html',
        published: parse("Apr 2022", "MMM y", new Date()),
        listed: true,
    }],
    ["fluid3", {
        name:"Fluid Simulation 3 - Smoothed Particle Hydrodynamics",
        url: '../fluid3.html',
        published: parse("Apr 2022", "MMM y", new Date()),
        listed: false,
    }],
    ["terraingeneration2", {
        name:"Terrain Generation 2 - Donut World Weather 1",
        url: '../terraingeneration2.html',
        published: parse("Apr 2022", "MMM y", new Date()),
        listed: true,
    }],
    ["gravity", {
        name:"Gravity - WebGL Simulation",
        url: '../gravity.html',
        published: parse("Apr 2022", "MMM y", new Date()),
        listed: true,
    }],
    ["lennardjones1", {
        name:"WebGL Simulation: Lennard Jones",
        url: '../lennardjones1.html',
        published: parse("Apr 2022", "MMM y", new Date()),
        listed: true,
    }],
]);
