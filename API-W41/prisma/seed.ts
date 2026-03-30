import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL || "",
});
const prisma = new PrismaClient({ adapter });

const tagNames = [
    "Histoire maritime",
    "Seconde Guerre mondiale",
    "Marine allemande",
    "Batailles navales",
    "Marine française",
    "XVIIIe siècle",
    "Construction navale",
    "Civilisation",
    "Exploration",

    // Trains
    "Chemins de fer",
    "Histoire ferroviaire",
    "Trains",
    "Transport ferroviaire",

    // Aviation
    "Aviation",
    "Histoire de l’aviation",
    "Avions",
    "Aéronautique",

    // Programmation
    "Programmation",
    "Informatique",
    "Développement logiciel",
    "Computer science",

    // Physique
    "Physique",
    "Physique théorique",
    "Mécanique quantique",
    "Physique quantique",
    "Relativité",
    "Cosmologie",
    "Physique des particules",

    // Chimie
    "Chimie",
    "Chimie organique",
    "Chimie générale",
    "Thermodynamique",
    "Biochimie",
];

const authors = [
    {
        firstname: "Robert",
        lastname: "Bour",
        books: [
            {
                title: "Un Lorrain dans la Kriegsmarine",
                publication_year: 2010,
                tags: [
                    "Histoire maritime",
                    "Seconde Guerre mondiale",
                    "Marine allemande",
                ],
            },
        ],
    },
    {
        firstname: "Erik",
        lastname: "Hübsch",
        books: [
            {
                title: "La Bataille de l'Atlantique",
                publication_year: 2002,
                tags: [
                    "Histoire maritime",
                    "Seconde Guerre mondiale",
                    "Batailles navales",
                ],
            },
        ],
    },
    {
        firstname: "Alain",
        lastname: "Demerliac",
        books: [
            {
                title: "La Marine française pendant la Révolution et l’Empire",
                publication_year: 1996,
                tags: [
                    "Histoire maritime",
                    "Marine française",
                    "XVIIIe siècle",
                ],
            },
        ],
    },
    {
        firstname: "Jean",
        lastname: "Boudriot",
        books: [
            {
                title: "Le Vaisseau de 74 canons",
                publication_year: 1973,
                tags: [
                    "Histoire maritime",
                    "Construction navale",
                    "XVIIIe siècle",
                ],
            },
        ],
    },
    {
        firstname: "William",
        lastname: "H. White",
        books: [
            {
                title: "The Sea and Civilization",
                publication_year: 2011,
                tags: ["Histoire maritime", "Civilisation", "Exploration"],
            },
        ],
    },
    {
        firstname: "Christian",
        lastname: "Wolmar",
        books: [
            {
                title: "Blood, Iron and Gold: How the Railways Transformed the World",
                publication_year: 2010,
                tags: [
                    "Chemins de fer",
                    "Histoire ferroviaire",
                    "Transport ferroviaire",
                ],
            },
        ],
    },
    {
        firstname: "Lucius",
        lastname: "Beebe",
        books: [
            {
                title: "The Trains We Rode",
                publication_year: 1965,
                tags: ["Trains", "Chemins de fer", "Histoire ferroviaire"],
            },
        ],
    },
    {
        firstname: "O. S.",
        lastname: "Nock",
        books: [
            {
                title: "The British Steam Railway Locomotive 1825–1925",
                publication_year: 1966,
                tags: ["Trains", "Histoire ferroviaire"],
            },
        ],
    },
    {
        firstname: "Brian",
        lastname: "Solomon",
        books: [
            {
                title: "Railroad Atlas of the United States",
                publication_year: 2014,
                tags: ["Trains", "Transport ferroviaire"],
            },
        ],
    },
    {
        firstname: "Michael",
        lastname: "Freeman",
        books: [
            {
                title: "Railways: The History of the World's Railways",
                publication_year: 2018,
                tags: ["Histoire ferroviaire", "Trains"],
            },
        ],
    },
    {
        firstname: "John",
        lastname: "Stover",
        books: [
            {
                title: "American Railroads",
                publication_year: 1997,
                tags: ["Chemins de fer", "Histoire ferroviaire"],
            },
        ],
    },
    {
        firstname: "George",
        lastname: "Drury",
        books: [
            {
                title: "The Historical Guide to North American Railroads",
                publication_year: 2015,
                tags: ["Chemins de fer", "Trains"],
            },
        ],
    },
    {
        firstname: "Clive",
        lastname: "Lamming",
        books: [
            {
                title: "Les Trains de légende",
                publication_year: 2005,
                tags: ["Trains", "Histoire ferroviaire"],
            },
        ],
    },
    {
        firstname: "Walter",
        lastname: "Boyne",
        books: [
            {
                title: "The Influence of Air Power Upon History",
                publication_year: 2003,
                tags: ["Aviation", "Histoire de l’aviation"],
            },
        ],
    },
    {
        firstname: "R. G.",
        lastname: "Grant",
        books: [
            {
                title: "Flight: The Complete History of Aviation",
                publication_year: 2007,
                tags: ["Aviation", "Histoire de l’aviation"],
            },
        ],
    },
    {
        firstname: "Philip",
        lastname: "Kaplan",
        books: [
            {
                title: "Fighter Aces of World War II",
                publication_year: 2006,
                tags: ["Aviation", "Seconde Guerre mondiale"],
            },
        ],
    },
    {
        firstname: "Bill",
        lastname: "Gunston",
        books: [
            {
                title: "The Development of Jet and Turbine Aero Engines",
                publication_year: 2006,
                tags: ["Aéronautique", "Avions"],
            },
        ],
    },
    {
        firstname: "John",
        lastname: "Anderson",
        books: [
            {
                title: "Introduction to Flight",
                publication_year: 2010,
                tags: ["Aéronautique", "Aviation"],
            },
        ],
    },
    {
        firstname: "Richard",
        lastname: "Hallion",
        books: [
            {
                title: "Taking Flight: Inventing the Aerial Age",
                publication_year: 2003,
                tags: ["Histoire de l’aviation", "Aviation"],
            },
        ],
    },
    {
        firstname: "Guy",
        lastname: "Norris",
        books: [
            {
                title: "Boeing 747: Design and Development",
                publication_year: 1999,
                tags: ["Aéronautique", "Avions"],
            },
        ],
    },
    {
        firstname: "Robert",
        lastname: "Jackson",
        books: [
            {
                title: "The World's Greatest Aircraft",
                publication_year: 2008,
                tags: ["Avions", "Aviation"],
            },
        ],
    },
    {
        firstname: "Robert",
        lastname: "Martin",
        books: [
            {
                title: "Clean Code",
                publication_year: 2008,
                tags: ["Programmation", "Développement logiciel"],
            },
        ],
    },
    {
        firstname: "Thomas",
        lastname: "Cormen",
        books: [
            {
                title: "Introduction to Algorithms",
                publication_year: 2009,
                tags: ["Programmation", "Computer science"],
            },
        ],
    },
    {
        firstname: "Donald",
        lastname: "Knuth",
        books: [
            {
                title: "The Art of Computer Programming",
                publication_year: 1968,
                tags: ["Computer science", "Programmation"],
            },
        ],
    },
    {
        firstname: "Andrew",
        lastname: "Hunt",
        books: [
            {
                title: "The Pragmatic Programmer",
                publication_year: 1999,
                tags: ["Programmation", "Développement logiciel"],
            },
        ],
    },
    {
        firstname: "Erich",
        lastname: "Gamma",
        books: [
            {
                title: "Design Patterns: Elements of Reusable Object-Oriented Software",
                publication_year: 1994,
                tags: ["Programmation", "Développement logiciel"],
            },
        ],
    },
    {
        firstname: "Martin",
        lastname: "Fowler",
        books: [
            {
                title: "Refactoring: Improving the Design of Existing Code",
                publication_year: 1999,
                tags: ["Programmation", "Développement logiciel"],
            },
        ],
    },
    {
        firstname: "Kyle",
        lastname: "Simpson",
        books: [
            {
                title: "You Don't Know JS Yet",
                publication_year: 2020,
                tags: ["Programmation", "Informatique"],
            },
        ],
    },
    {
        firstname: "Bjarne",
        lastname: "Stroustrup",
        books: [
            {
                title: "The C++ Programming Language",
                publication_year: 2013,
                tags: ["Programmation", "Computer science"],
            },
        ],
    },
    {
        firstname: "Stephen",
        lastname: "Hawking",
        books: [
            {
                title: "A Brief History of Time",
                publication_year: 1988,
                tags: ["Physique", "Cosmologie"],
            },
            {
                title: "The Universe in a Nutshell",
                publication_year: 2001,
                tags: ["Physique", "Cosmologie"],
            },
            {
                title: "The Grand Design",
                publication_year: 2010,
                tags: ["Physique théorique", "Cosmologie"],
            },
        ],
    },
    {
        firstname: "Richard",
        lastname: "Feynman",
        books: [
            {
                title: "The Feynman Lectures on Physics",
                publication_year: 1964,
                tags: ["Physique"],
            },
            {
                title: "QED: The Strange Theory of Light and Matter",
                publication_year: 1985,
                tags: ["Physique", "Physique quantique"],
            },
            {
                title: "Six Easy Pieces",
                publication_year: 1994,
                tags: ["Physique"],
            },
        ],
    },
    {
        firstname: "Brian",
        lastname: "Greene",
        books: [
            {
                title: "The Elegant Universe",
                publication_year: 1999,
                tags: ["Physique théorique", "Cosmologie"],
            },
            {
                title: "The Fabric of the Cosmos",
                publication_year: 2004,
                tags: ["Relativité", "Cosmologie"],
            },
            {
                title: "Until the End of Time",
                publication_year: 2020,
                tags: ["Cosmologie"],
            },
        ],
    },
    {
        firstname: "Leonard",
        lastname: "Susskind",
        books: [
            {
                title: "The Cosmic Landscape",
                publication_year: 2005,
                tags: ["Cosmologie", "Physique théorique"],
            },
            {
                title: "Quantum Mechanics: The Theoretical Minimum",
                publication_year: 2014,
                tags: ["Mécanique quantique"],
            },
        ],
    },
    {
        firstname: "Linus",
        lastname: "Pauling",
        books: [
            {
                title: "The Nature of the Chemical Bond",
                publication_year: 1939,
                tags: ["Chimie", "Chimie générale"],
            },
            {
                title: "General Chemistry",
                publication_year: 1970,
                tags: ["Chimie générale"],
            },
        ],
    },
    {
        firstname: "Peter",
        lastname: "Atkins",
        books: [
            {
                title: "Physical Chemistry",
                publication_year: 1978,
                tags: ["Chimie", "Thermodynamique"],
            },
            {
                title: "Atkins' Molecules",
                publication_year: 2003,
                tags: ["Chimie"],
            },
            {
                title: "The Laws of Thermodynamics",
                publication_year: 2010,
                tags: ["Thermodynamique"],
            },
        ],
    },
    {
        firstname: "Clayden",
        lastname: "Jonathan",
        books: [
            {
                title: "Organic Chemistry",
                publication_year: 2001,
                tags: ["Chimie organique"],
            },
            {
                title: "Solutions Manual to Organic Chemistry",
                publication_year: 2012,
                tags: ["Chimie organique"],
            },
        ],
    },
    {
        firstname: "Lehninger",
        lastname: "Albert",
        books: [
            {
                title: "Principles of Biochemistry",
                publication_year: 1982,
                tags: ["Biochimie"],
            },
            {
                title: "Biochemistry",
                publication_year: 1970,
                tags: ["Biochimie"],
            },
        ],
    },
];

async function main() {
    // --- Create Tags ---
    const tagMap: Record<string, any> = {};
    for (const name of tagNames) {
        const tag = await prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        tagMap[name] = tag;
    }

    // --- Create Authors and Books ---
    for (const authorData of authors) {
        const author = await prisma.author.create({
            data: {
                firstname: authorData.firstname,
                lastname: authorData.lastname,
                books: {
                    create: authorData.books.map((book) => ({
                        title: book.title,
                        publication_year: book.publication_year,
                        tags: {
                            connect: book.tags.map((t) => {
                                if (!tagMap[t]) {
                                    throw new Error(
                                        `Tag manquant dans tagNames: ${t}`,
                                    );
                                }
                                return { id: tagMap[t].id };
                            }),
                        },
                    })),
                },
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
