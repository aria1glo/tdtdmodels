/* ==========================================================
   roster.js — the ONE place to edit talent.
   Every page (home, women, men, model profiles) reads this list.

   To add a model:
     1. Drop their photos in images/models/<their-id>/ (01.jpg, 02.jpg …)
     2. Copy one block below and change id / name / division / instagram / stats / images
     3. First photo = card cover, second photo = hover image
   Leave `stats` out (or empty) if you don't have measurements yet.
   ========================================================== */

// Builds ["images/models/<slug>/01.jpg", …] — pass how many photos the folder has
const photos = (slug, n) =>
  Array.from({ length: n }, (_, i) => `images/models/${slug}/${String(i + 1).padStart(2, "0")}.jpg`);

window.ROSTER = [
  /* ---------------- WOMEN ---------------- */
  { id: "aria-carmona", name: "Aria Carmona", division: "women", featured: true, instagram: "aria.glo",
    stats: { Height: `5'9"`, Bust: `34"`, Waist: `24"`, Hips: `34"`, Shoe: "10", Eyes: "Brown", Hair: "Black" },
    images: photos("aria-carmona", 6) },

  { id: "kiyana-simmons", name: "Kiyana Simmons", division: "women", instagram: "pretti_beyond",
    stats: { Height: `5'2"`, Bust: `36"`, Waist: `33"`, Hips: `42"`, Shoe: "8", Eyes: "Brown", Hair: "Black" },
    images: photos("kiyana-simmons", 5) },

  { id: "laura-brooks", name: "Laura Brooks", division: "women", instagram: "laurasosexc",
    stats: { Height: `5'7"`, Bust: `34"`, Waist: `29"`, Hips: `44"`, Dress: "M", Shoe: "9", Eyes: "Brown", Hair: "Brown" },
    images: photos("laura-brooks", 4) },

  { id: "sanna-jackman", name: "Sanna Jackman", division: "women", instagram: "sannaa.j_",
    stats: { Height: `6'0"`, Bust: `36"`, Waist: `28"`, Hips: `43"`, Eyes: "Brown", Hair: "Black" },
    images: photos("sanna-jackman", 5) },

  { id: "isabella-sabillon", name: "Isabella Sabillon", division: "women",
    stats: { Height: `5'4"`, Bust: `35"`, Waist: `27"`, Hips: `38"`, Dress: "4", Shoe: "8.5", Eyes: "Brown", Hair: "Brown" },
    images: photos("isabella-sabillon", 4) },

  { id: "julia-nelson-aaron", name: "Julia Nelson Aaron", division: "women",
    stats: { Height: `5'6"`, Bust: `34"`, Waist: `28"`, Hips: `39"`, Shoe: "7.5", Eyes: "Blue/green", Hair: "Brown" },
    images: photos("julia-nelson-aaron", 4) },

  { id: "lauren-dong", name: "Lauren Dong", division: "women", instagram: "laurenddong",
    images: photos("lauren-dong", 5) },

  { id: "sira", name: "Sira", division: "women", featured: true, instagram: "sira.ashh",
    images: photos("sira-ashh", 5) },

  { id: "phylicia", name: "Phylicia Atherley", division: "women", instagram: "phyliciaaxo",
    stats: { Height: `5'7"`, Bust: `30"`, Waist: `26"`, Hips: `37"`, Shoe: "9", Eyes: "Brown", Hair: "Black" },
    images: photos("phylicia", 4) },

  { id: "val", name: "Val", division: "women", instagram: "val3m0r",
    images: photos("val3m0r", 3) },

  /* ---------------- MEN ---------------- */
  { id: "jacob-fields", name: "Jacob Fields", division: "men", featured: true, instagram: "itboyjayke",
    stats: { Height: `6'0"`, Chest: `36"`, Waist: `30.5"` },
    images: photos("jacob-fields", 5) },

  { id: "manpal-singh", name: "Manpal Singh", division: "men", instagram: "manpal01",
    images: photos("manpal-singh", 4) },

  { id: "chibuike-onukaogu", name: "Chibuike Onukaogu", division: "men", featured: true, instagram: "chibuike_onukaogu",
    images: photos("chibuike-onukaogu", 4) }
];
