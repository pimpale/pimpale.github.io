import { parse } from 'date-fns/parse'
// this component dos nothing but export the data
// of all the articles written. Pls update it when new article is written
// Article lists all around the site will be changed.

export type Article = {
  name: string,
  incipit?: string,
  url: string,
  published: Date,
  listed: boolean,
  fiction: boolean,
}

export const articleData: Map<string, Article> = new Map([
  ["terraingeneration1", {
    name: "Terrain Generation 1: Donut World Topology",
    incipit: "Procedurally generate and simulate a small game world.",
    url: '../terraingeneration1.html',
    published: parse("Jun 2021", "MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["fluid1", {
    name: "Fluid Simulation 1: Learning WebGL with Heat Transfer Simulation",
    incipit: "Provide a brief introduction to WebGL and its uses, demonstrate working code to simulate 2D heat transfer.",
    url: '../fluid1.html',
    published: parse("Feb 2022", "MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["fluid2", {
    name: "Fluid Simulation 2: WebGL Fluid Simulation from Scratch!",
    incipit: "Our goals are to explain the math behind fluid simulation and build a 2D incompressible flow demo in WebGL.",
    url: '../fluid2.html',
    published: parse("Apr 2022", "MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["fluid3", {
    name: "Fluid Simulation 3: Smoothed Particle Hydrodynamics",
    incipit: "Our goals are to map the fluid simulation onto a sphere and extend it to 3D.",
    url: '../fluid3.html',
    published: parse("Apr 2022", "MMM y", new Date()),
    listed: false,
    fiction: false,
  }],
  ["terraingeneration2", {
    name: "Terrain Generation 2: Donut World Weather 1",
    url: '../terraingeneration2.html',
    published: parse("Apr 2022", "MMM y", new Date()),
    listed: false,
    fiction: false,
  }],
  ["gravity", {
    name: "Gravity: WebGL Simulation",
    incipit: "Interactive WebGL demo showcasing orbital gravity, adapted from my Spacewar and GravitySimulator projects.",
    url: '../gravity.html',
    published: parse("Apr 2022", "MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["achernar", {
    name: "Achernar",
    url: '../achernar.html',
    published: parse("Apr 2022", "MMM y", new Date()),
    listed: false,
    fiction: false,
  }],
  ["lennardjones1", {
    name: "WebGL Simulation: Lennard Jones",
    incipit: "A WebGL visualization of particles interacting via the Lennard-Jones potential.",
    url: '../lennardjones1.html',
    published: parse("Apr 2022", "MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["lasagna", {
    name: "Lasagna: Combining Lisp and Forth",
    incipit: "Lasagna is a tiny stack-based language inspired by Forth and Lisp, implemented in under a thousand lines of C.",
    url: '../lasagna.html',
    published: parse("20 Jun 2022", "d MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["whyvoxels", {
    name: "Why are all voxels cubes?",
    incipit: "We explore the mathematical reasons voxel games use cubes and investigate potential 3D grid alternatives.",
    url: '../whyvoxels.html',
    published: parse("22 Jun 2022", "d MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["timezonespace", {
    name: "Time Zones and Space Colonization",
    incipit: "We discuss why current timekeeping fails in space and propose a new system for future colonies.",
    url: '../timezonespace.html',
    published: parse("13 Oct 2022", "d MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["metadriverl", {
    name: "Metadrive RL Tutorials",
    incipit: "Step-by-step derivations and solutions for reinforcement-learning algorithms in MetaDrive (Policy Gradient, DQN, PPO).",
    url: '../metadrive_rl.html',
    published: parse("14 Jul 2023", "d MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["english-parser", {
    name: "Constituency Parsing English",
    incipit: "Type a sentence and watch an interactive English constituency parser, powered by a Nearley grammar, draw its syntax tree.",
    url: '../parse_english.html',
    published: parse("14 Jul 2024", "d MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["linear-vs-logit-osl", {
    name: "Linear vs Logit Observational Scaling Laws",
    incipit: "Experiments testing whether logit space or normalization improves PCA-based Observational Scaling Laws.",
    url: '../linear_vs_logit_observational_scaling_laws.html',
    published: parse("2 Feb 2025", "d MMM y", new Date()),
    listed: true,
    fiction: false,
  }],
  ["logos-post", {
    name: "The Logos",
    incipit: "A meditation on language, reason, and the shared lineage of humans and large language models.",
    url: '../logospost.html',
    published: parse("26 May 2025", "d MMM y", new Date()),
    listed: true,
    fiction: true,
  }]
]);
