// This is simply a function that populates the database with some schools.

import School from "../models/School.js";

const schools = [
  {
    name: "Copenhagen Business School",
    latitude: 55.68164985658707,
    longitude: 12.529662210803242,
    address: "Solbjerg Pl. 3",
    zip: 2000,
    city: "Frederiksberg",
    logo: "https://design.cbs.dk/wp-content/uploads/CBSlogo_official_rgb_blue.svg",
    thumbnail:
      "https://design.cbs.dk/wp-content/uploads/CBSlogo_vertical_rgb_blue.svg",
  },
  {
    name: "IT Universitetet",
    latitude: 55.65965312971175,
    longitude: 12.591194031693961,
    address: "Rued Langgaards Vej 7",
    zip: 2300,
    city: "København S",
    logo: "https://itu.dk/-/media/DK/Om-ITU/Presse/ITU-Logoer/ITU_logo_CPH_UK-jpg.jpg",
    thumbnail:
      "https://itu.dk/-/media/DK/Om-ITU/Presse/ITU-Logoer/ITU_logo_CPH_UK-jpg.jpg",
  },
  {
    name: "Københavns Universitet",
    latitude: 55.680375449662066,
    longitude: 12.572345224296168,
    address: "Nørregade 10",
    zip: 1172,
    city: "København (Indre By)",
    logo: "https://designguide.ku.dk/download/co-branding/ku_logo_dk_hh.png",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ku-ucph-logo-svg.svg/1200px-Ku-ucph-logo-svg.svg.png",
  },
];

export const populateSchools = async () => {
  try {
    await School.deleteMany({});
    await School.insertMany(schools);
    console.log("Schools added to database");
  } catch (error) {
    console.log(error);
  }
};
