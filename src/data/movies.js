import { MOVIE_STATUS } from "../constants.js";

// DEMO DATA. Real film titles use approximate public metadata (rating, fame are
// demo values). Titles marked "fictional" do not exist. All schedules are fictional.
// Posters: put image files in public/posters/<id>.jpg and public/posters/<id>-backdrop.jpg.
// If a file is missing, the app shows a generated placeholder instead.
const poster = (id) => `/posters/${id}.jpg`;
const backdrop = (id) => `/posters/${id}-backdrop.jpg`;

const NOW = MOVIE_STATUS.NOW_SHOWING;
const SOON = MOVIE_STATUS.COMING_SOON;

export const MOVIE_DATA = [
  {
    id: "the-dark-knight",
    title: "The Dark Knight",
    synopsis:
      "Batman, Lieutenant Gordon and District Attorney Harvey Dent set out to dismantle Gotham's organized crime, until a criminal mastermind called the Joker pushes the city to its breaking point.",
    genres: ["Action", "Crime", "Drama"],
    durationMinutes: 152,
    rating: 9.0,
    fameScore: 10,
    releaseDate: "2008-07-18",
    status: NOW,
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
  },
  {
    id: "inception",
    title: "Inception",
    synopsis:
      "A skilled thief who steals secrets from inside people's dreams is offered a chance to erase his past, but only if he can plant an idea in a target's mind instead of taking one.",
    genres: ["Sci-Fi", "Action", "Thriller"],
    durationMinutes: 148,
    rating: 8.8,
    fameScore: 9.5,
    releaseDate: "2010-07-16",
    status: NOW,
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    synopsis:
      "The story of physicist J. Robert Oppenheimer, the scientists of the Manhattan Project, and the moral weight of the weapon they built.",
    genres: ["Drama", "History", "Thriller"],
    durationMinutes: 180,
    rating: 8.3,
    fameScore: 9.5,
    releaseDate: "2023-07-21",
    status: NOW,
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
  },
  {
    id: "interstellar",
    title: "Interstellar",
    synopsis:
      "With Earth's crops failing, a former pilot joins a team of explorers who travel through a wormhole in search of a new home for humanity.",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    durationMinutes: 169,
    rating: 8.7,
    fameScore: 9,
    releaseDate: "2014-11-07",
    status: NOW,
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
  },
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    synopsis:
      "Paul Atreides joins the Fremen on Arrakis to take revenge on those who destroyed his family, while facing a choice between the woman he loves and the fate of the universe.",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    durationMinutes: 166,
    rating: 8.5,
    fameScore: 9,
    releaseDate: "2024-03-01",
    status: NOW,
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler"],
  },
  {
    id: "top-gun-maverick",
    title: "Top Gun: Maverick",
    synopsis:
      "After more than thirty years of service, Pete \"Maverick\" Mitchell trains a new generation of elite pilots for a mission that demands more than skill.",
    genres: ["Action", "Drama"],
    durationMinutes: 130,
    rating: 8.2,
    fameScore: 9,
    releaseDate: "2022-05-27",
    status: NOW,
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"],
  },
  {
    id: "parasite",
    title: "Parasite",
    synopsis:
      "A struggling family schemes its way into the lives of a wealthy household, and the two worlds collide with consequences nobody expected.",
    genres: ["Thriller", "Drama", "Comedy"],
    durationMinutes: 132,
    rating: 8.5,
    fameScore: 8,
    releaseDate: "2019-05-30",
    status: NOW,
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
  },
  {
    id: "spider-verse",
    title: "Spider-Man: Across the Spider-Verse",
    synopsis:
      "Miles Morales is swung across the multiverse, where he meets a team of Spider-People and must decide how to face a threat that challenges everything he believes.",
    genres: ["Animation", "Action", "Adventure"],
    durationMinutes: 140,
    rating: 8.6,
    fameScore: 8,
    releaseDate: "2023-06-02",
    status: NOW,
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac", "Issa Rae"],
  },
  {
    id: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    synopsis:
      "A laundromat owner is pulled into a chaotic multiverse adventure where she may be the only one who can stop a threat to every reality.",
    genres: ["Sci-Fi", "Comedy", "Action"],
    durationMinutes: 139,
    rating: 7.8,
    fameScore: 7,
    releaseDate: "2022-03-25",
    status: NOW,
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan", "Jamie Lee Curtis"],
  },
  {
    id: "weekend-getaway",
    title: "Weekend Getaway (fictional)",
    synopsis:
      "Three old friends borrow a beach house for one weekend and discover that nothing about the plan goes the way the group chat promised.",
    genres: ["Comedy", "Romance"],
    durationMinutes: 104,
    rating: 7.0,
    fameScore: 5,
    releaseDate: "2025-09-05",
    status: NOW,
    cast: ["Alex Rivera", "Maya Santos", "Daniel Cruz"],
  },
  {
    id: "pocket-dragons",
    title: "Pocket Dragons (fictional)",
    synopsis:
      "A shy kid discovers a nest of tiny dragons in the school garden and has one week to hide them from the whole town.",
    genres: ["Animation", "Family", "Fantasy"],
    durationMinutes: 95,
    rating: 6.8,
    fameScore: 4,
    releaseDate: "2025-06-20",
    status: NOW,
    cast: ["Voice of Lia Ramos", "Voice of Ben Torres", "Voice of Nina Park"],
  },
  {
    id: "harbor-lights",
    title: "Harbor Lights (fictional)",
    synopsis:
      "A lighthouse keeper's daughter and a visiting sailor spend one summer trying to decide where home really is.",
    genres: ["Romance", "Drama"],
    durationMinutes: 112,
    rating: 6.1,
    fameScore: 3,
    releaseDate: "2025-02-14",
    status: NOW,
    cast: ["Isla Navarro", "Marco Villanueva", "Teresa Lim"],
  },
  {
    id: "neon-harbor",
    title: "Neon Harbor (fictional)",
    synopsis:
      "In a flooded future city, a harbor inspector uncovers a smuggling ring hidden inside the glowing night market.",
    genres: ["Thriller", "Sci-Fi"],
    durationMinutes: 126,
    rating: 0,
    fameScore: 6,
    releaseDate: "2026-12-18",
    status: SOON,
    cast: ["Jun Alvarez", "Priya Nair", "Leo Bautista"],
  },
  {
    id: "the-last-lantern",
    title: "The Last Lantern (fictional)",
    synopsis:
      "When the final lantern of a mountain kingdom begins to fade, a young mapmaker sets out to find the source of its light.",
    genres: ["Fantasy", "Adventure"],
    durationMinutes: 134,
    rating: 0,
    fameScore: 5,
    releaseDate: "2027-01-22",
    status: SOON,
    cast: ["Sofia Mendoza", "Kai Tanaka", "Omar Haddad"],
  },
  {
    id: "midnight-orchestra",
    title: "Midnight Orchestra (fictional)",
    synopsis:
      "A retired conductor reunites his former musicians for one last concert in a theater everyone else has forgotten.",
    genres: ["Drama", "Music"],
    durationMinutes: 118,
    rating: 0,
    fameScore: 4,
    releaseDate: "2027-02-12",
    status: SOON,
    cast: ["Elena Fuentes", "Samuel Okafor", "Grace Lee"],
  },
].map((movie) => ({
  ...movie,
  posterUrl: poster(movie.id),
  backdropUrl: backdrop(movie.id),
}));
