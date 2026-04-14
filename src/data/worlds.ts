export interface World {
  id: string;
  name: string;
  greeting: string;
  emoji: string;
  bgFrom: string;
  bgTo: string;
  textColor: string;
  accentColor: string;
  style: string;
  signature: string;
}

export const worlds: World[] = [
  {
    id: "medieval",
    name: "Royaume Médiéval",
    greeting:
      "Oyez oyez, noble visiteur ! Que la Providence vous accorde santé, opulence et une literie digne de vos augustes fesses. Le seigneur du château vous convie à festoyer — attention toutefois aux rats dans la soupe.",
    emoji: "🏰",
    bgFrom: "from-amber-900",
    bgTo: "to-yellow-700",
    textColor: "text-yellow-100",
    accentColor: "bg-yellow-500",
    style: "Vieux français solennel, tournures archaïques",
    signature: "— Messire Guillaume de Baguette, Héraut Royal",
  },
  {
    id: "space",
    name: "Espace Lointain",
    greeting:
      "Transmission reçue, unité biologique ! Bienvenue dans le secteur Omicron-7. Votre niveau d'oxygène est correct — pour l'instant. Le distributeur de capsules nutritives est en panne depuis 3 semaines, mais le moral est excellent. Enfin, « excellent » dans les limites autorisées par le règlement.",
    emoji: "🚀",
    bgFrom: "from-slate-900",
    bgTo: "to-indigo-900",
    textColor: "text-cyan-100",
    accentColor: "bg-indigo-500",
    style: "Protocole techno-bureaucratique interstellaire",
    signature: "— IA ARIA-9, Service d'Accueil Galactique (en maintenance)",
  },
  {
    id: "pirate",
    name: "Haute Mer des Pirates",
    greeting:
      "ARRR ! Bienvenue à bord du Cochon Volant, moussaillon ! Tu pues moins que les autres, c'est un compliment. Attention à la planche, le rhum est rationné (par moi, pour moi), et si tu tombes à l'eau, on te jettera peut-être une corde. Peut-être.",
    emoji: "🏴‍☠️",
    bgFrom: "from-blue-900",
    bgTo: "to-teal-800",
    textColor: "text-blue-100",
    accentColor: "bg-blue-500",
    style: "Argot pirate, « Arr ! », mots entre crochets",
    signature: "— Capitaine Barbe-de-Brie, Terreur des Sept Mers (et des fromages)",
  },
  {
    id: "underwater",
    name: "Cité Sous-Marine",
    greeting:
      "~~ Bloop bloop, bienvenue à Aquatolis ! ~~ Ici on respire par les branchies, on mange du plancton et on trouve ça délicieux (ou on ment très bien). Le requin à l'accueil s'appelle Gérard, il a l'air menaçant mais il est juste timide. Ne lui tendez pas la main.",
    emoji: "🐠",
    bgFrom: "from-blue-800",
    bgTo: "to-cyan-700",
    textColor: "text-blue-100",
    accentColor: "bg-cyan-400",
    style: "Ondulations aquatiques, bulles, monde sous l'eau",
    signature: "— Madame la Pieuvre Marguerite, Maire d'Aquatolis",
  },
  {
    id: "western",
    name: "Far West",
    greeting:
      "Yo, étranger. T'as l'air du genre à avoir soif. Le saloon est ouvert, le pianiste joue faux depuis 1887, et le shérif est à la sieste — c'est le bon moment pour faire des bêtises. Ou pas. Ici, les cercueils se vendent bien.",
    emoji: "🤠",
    bgFrom: "from-orange-900",
    bgTo: "to-red-800",
    textColor: "text-orange-100",
    accentColor: "bg-yellow-600",
    style: "Laconique, ambiance poussiéreuse, humour sec",
    signature: "— Doc Pétunia, Seul Médecin / Barbier / Fossoyeur du Comté",
  },
  {
    id: "zombie",
    name: "Apocalypse Zombie",
    greeting:
      "Ohhh, un vivant ! Ne pars pas, mes derniers collègues se sont… transformés lors du pot de départ. Bienvenue au Bunker B-47 ! On a des conserves de 2019, un générateur capricieux et une règle stricte : toujours vérifier si quelqu'un est zombie AVANT de lui serrer la main.",
    emoji: "🧟",
    bgFrom: "from-green-900",
    bgTo: "to-gray-800",
    textColor: "text-green-100",
    accentColor: "bg-green-600",
    style: "Survivaliste épuisé, humour noir malgré tout",
    signature: "— Kevin, Responsable RH (et seul survivant du département)",
  },
  {
    id: "antiquity",
    name: "Rome Antique",
    greeting:
      "Ave, citoyen ! Par Jupiter, tu as l'air en bonne santé — méfie-toi, les dieux sont jaloux. Le Colisée est complet ce soir (les lions sont en forme), mais il reste des places pour le banquet de César. Spoiler : fais attention aux amis qui t'offrent des couronnes de lauriers.",
    emoji: "🏛️",
    bgFrom: "from-stone-800",
    bgTo: "to-amber-700",
    textColor: "text-amber-100",
    accentColor: "bg-amber-500",
    style: "Latin mâtiné de français, solennité impériale",
    signature: "— Maximus Ridiculus, Sénateur (provisoire, en attendant le vote)",
  },
  {
    id: "cyberpunk",
    name: "Neo-Ciudad 2087",
    greeting:
      "Yo, skin. Bienvenue dans les ruelles de Neo-Ciudad. Tes implants sont obsolètes (version 3.2 ? Sérieux ?) mais on t'accueille quand même. Le datacafé vend du vrai café à 40 crédits, le corp local recrute des âmes — tarif négociable — et Big Brother te regarde. Lui et les 47 autres caméras.",
    emoji: "🤖",
    bgFrom: "from-purple-900",
    bgTo: "to-pink-900",
    textColor: "text-pink-100",
    accentColor: "bg-pink-500",
    style: "Jargon cyberpunk, mélange anglais/français, dystopie corporate",
    signature: "— ZERO_COOL, Fixeur Indépendant (pas affilié aux corps, promis)",
  },
  {
    id: "wizard",
    name: "Tour des Sorciers",
    greeting:
      "Ah, un apprenti ! Ou un livreur. Dans les deux cas, essuyez vos pieds — la dernière personne qui a ramené de la boue a fini en grenouille jusqu'au mercredi. Bienvenue à la Tour Mystique. Le grimoire est à gauche, le chaudron à droite, et l'alarme incendie n'existe pas encore dans cette époque.",
    emoji: "🧙",
    bgFrom: "from-violet-900",
    bgTo: "to-blue-900",
    textColor: "text-violet-100",
    accentColor: "bg-violet-500",
    style: "Mystique distrait, ton de professeur bourru mais bienveillant",
    signature: "— Archimage Théodore-Barnabé, Maître de la 7ème Flamme (et du thé)",
  },
];
