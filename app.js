// Palette AI — app.js
// https://t1ptip.github.io/palette-ai

const DATA = [
  { he:{title:'📸 סגנון צילום'},en:{title:'📸 Photography Style'},tags:[{he:{label:'ריאליסטי',sub:'Raw Photo 8K'},en:{label:'Realistic',sub:'Raw Photo 8K'},val:'photorealistic, 8k, raw photo, sharp details'},{he:{label:'קולנועי',sub:'Cinematic'},en:{label:'Cinematic',sub:'Film Look'},val:'cinematic lighting, dramatic shadows, film grain'},{he:{label:'טשטוש רקע',sub:'Bokeh'},en:{label:'Bokeh',sub:'Depth of Field'},val:'bokeh, shallow depth of field, sharp focus subject'},{he:{label:'תלת מימד',sub:'Unreal Engine 5'},en:{label:'3D Render',sub:'Unreal Engine 5'},val:'unreal engine 5, octane render, 3d rendering, volumetric'},{he:{label:'אנלוגי',sub:'Film Photography'},en:{label:'Analog',sub:'Film Photography'},val:'analog film, 35mm, kodak portra, vintage photography'},{he:{label:'מאקרו',sub:'Macro Lens'},en:{label:'Macro',sub:'Macro Lens'},val:'macro photography, extreme close-up, fine detail'},{he:{label:'HDR',sub:'High Dynamic Range'},en:{label:'HDR',sub:'High Dynamic Range'},val:'HDR photography, high contrast, vivid colors'},{he:{label:'דוקומנטרי',sub:'Documentary Style'},en:{label:'Documentary',sub:'Cinematic Doc'},val:'documentary-style photography, dramatic cinematic realism, gritty photojournalism'}]},
  { he:{title:'🎨 סגנון אמנות'},en:{title:'🎨 Art Style'},tags:[{he:{label:'שמן על בד',sub:'Oil Painting'},en:{label:'Oil Painting',sub:'Classical Art'},val:'oil painting, brushstrokes, classical art style'},{he:{label:'צבעי מים',sub:'Watercolor'},en:{label:'Watercolor',sub:'Soft Edges'},val:'watercolor painting, soft edges, flowing colors'},{he:{label:'קומיקס',sub:'Comic Book'},en:{label:'Comic Book',sub:'Bold Outlines'},val:'comic book art, bold outlines, halftone'},{he:{label:'אנימה',sub:'Anime Style'},en:{label:'Anime',sub:'Manga Style'},val:'anime style, manga art, studio ghibli inspired'},{he:{label:'קו ועיפרון',sub:'Line Art'},en:{label:'Line Art',sub:'Ink Drawing'},val:'line art, ink drawing, precise linework'},{he:{label:'פיקסל',sub:'Pixel Art'},en:{label:'Pixel Art',sub:'16-bit Retro'},val:'pixel art, 16-bit, retro game style'},{he:{label:'קונספט ארט',sub:'Concept Art'},en:{label:'Concept Art',sub:'ArtStation Style'},val:'concept art, artstation, professional illustration'},{he:{label:'אימפרסיוניזם',sub:'Impressionism'},en:{label:'Impressionism',sub:'Monet Inspired'},val:'impressionist style, monet inspired, loose brushwork'},{he:{label:'דיסני',sub:'Disney Animation'},en:{label:'Disney Style',sub:'Disney Animation'},val:'Disney animation style, Disney character art, expressive eyes, smooth clean lines, magical Disney aesthetic'},{he:{label:'גיבורי על',sub:'Superhero Comics'},en:{label:'Superhero Comics',sub:'Action Style'},val:'superhero comics art style, dynamic action illustration, bold linework, vibrant colors, heroic pose'}]},
  { he:{title:'🎬 ז\u05f3אנר'},en:{title:'🎬 Genre'},tags:[{he:{label:'סייברפאנק',sub:'Cyberpunk'},en:{label:'Cyberpunk',sub:'Neon Future'},val:'cyberpunk, neon lights, futuristic city, rain-slicked streets'},{he:{label:'פנטזיה חשוכה',sub:'Dark Fantasy'},en:{label:'Dark Fantasy',sub:'Gothic Mood'},val:'dark fantasy, gothic atmosphere, moody, arcane'},{he:{label:'אימה',sub:'Horror'},en:{label:'Horror',sub:'Eerie & Scary'},val:'horror atmosphere, eerie, unsettling, dark and creepy'},{he:{label:'סטימפאנק',sub:'Steampunk'},en:{label:'Steampunk',sub:'Victorian Gears'},val:'steampunk, gears and cogs, Victorian, brass machinery'},{he:{label:'נואר',sub:'Noir'},en:{label:'Noir',sub:'B&W Shadows'},val:'film noir, black and white, high contrast shadows'},{he:{label:'רטרו עתידני',sub:'Retro-Futuristic'},en:{label:'Retro-Futuristic',sub:'1960s Space Age'},val:'retro-futuristic, 1960s space age, optimistic sci-fi'},{he:{label:'מדע בדיוני',sub:'Sci-Fi'},en:{label:'Sci-Fi',sub:'Sci-Fi'},val:'science fiction, futuristic action, high-tech world, sci-fi movie poster style'},{he:{label:'אופרת חלל',sub:'Space Opera'},en:{label:'Space Opera',sub:'Galactic Epic'},val:'space opera, galactic epic, deep space environment, alien worlds, interstellar adventure'}]},
  { he:{title:'💡 תאורה'},en:{title:'💡 Lighting'},tags:[{he:{label:'שקיעה',sub:'Golden Hour'},en:{label:'Sunset',sub:'Golden Hour'},val:'golden hour, warm sunlight, long shadows'},{he:{label:'ניאון',sub:'Neon Lights'},en:{label:'Neon',sub:'Neon Lights'},val:'neon lighting, colorful reflections, wet pavement'},{he:{label:'עגמומי',sub:'Moody Lighting'},en:{label:'Moody',sub:'Dramatic Light'},val:'dramatic lighting, moody atmosphere, chiaroscuro'},{he:{label:'אור יום',sub:'Natural Light'},en:{label:'Daylight',sub:'Natural Light'},val:'natural daylight, soft diffused light, bright and airy'},{he:{label:'תאורת רקע',sub:'Backlight'},en:{label:'Backlit',sub:'Rim Lighting'},val:'backlit, rim lighting, silhouette, contre-jour'},{he:{label:'לילה',sub:'Night Scene'},en:{label:'Night',sub:'Night Scene'},val:'night scene, moonlight, stars, dark sky'},{he:{label:'ניגוד חזק',sub:'Strong Contrast'},en:{label:'Strong Contrast',sub:'Strong Contrast'},val:'chiaroscuro lighting, extreme contrast, dramatic shadow play, Rembrandt lighting'},{he:{label:'סטודיו',sub:'Studio Light'},en:{label:'Studio Light',sub:'Softbox'},val:'studio lighting, softbox, clean professional light, controlled shadows'},{he:{label:'דמדומים',sub:'Blue Hour'},en:{label:'Blue Hour',sub:'Twilight'},val:'blue hour, twilight, cool blue tones, dusk atmosphere'},{he:{label:'זרקור',sub:'Spotlight'},en:{label:'Spotlight',sub:'Focused Beam'},val:'spotlight, focused light beam, theatrical lighting, dramatic center light'}]},
  { he:{title:'⚙️ איכות'},en:{title:'⚙️ Quality'},tags:[{he:{label:'Masterpiece',sub:'Highest Quality'},en:{label:'Masterpiece',sub:'Highest Quality'},val:'masterpiece, best quality, ultra high resolution'},{he:{label:'היפר-ריאליסטי',sub:'Hyperrealistic'},en:{label:'Hyperrealistic',sub:'Ultra-detailed'},val:'hyperrealistic, photographic quality, ultra-detailed'},{he:{label:'פרטים עדינים',sub:'Fine Details'},en:{label:'Fine Details',sub:'Complex Textures'},val:'intricate details, highly detailed, complex textures'},{he:{label:'דיגיטל',sub:'Digital Art'},en:{label:'Digital Art',sub:'Digital Painting'},val:'digital art, digital painting, professional artwork'},{he:{label:'8K HDR',sub:'Ultra Resolution'},en:{label:'8K HDR',sub:'Ultra Resolution'},val:'8K resolution, HDR, ultra-detailed textures, sharp focus'},{he:{label:'גרעין סרט',sub:'Film Grain'},en:{label:'Film Grain',sub:'Analog Texture'},val:'film grain, analog texture, subtle noise, cinematic grain'},{he:{label:'פופולרי ברשת',sub:'Viral Art'},en:{label:'Trending Online',sub:'Viral Art'},val:'trending on artstation, award winning digital art, featured artwork'}]},
  { he:{title:'🎭 דמויות'},en:{title:'🎭 Characters'},tags:[{he:{label:'סייבורג',sub:'Cybernetic Warrior'},en:{label:'Cyborg Warrior',sub:'Half Machine'},val:'cybernetic warrior, half human half machine, mechanical parts, robotic implants'},{he:{label:'אסטרונאוט',sub:'Space Suit'},en:{label:'Astronaut',sub:'Space Suit'},val:'astronaut, detailed space suit, helmet visor, scratched suit, dusty, zero gravity'},{he:{label:'אלה מיתולוגית',sub:'Goddess'},en:{label:'Mythology Goddess',sub:'Divine Figure'},val:'divine goddess, mythological figure, ethereal beauty, celestial aura'},{he:{label:'RPG פנטזיה',sub:'Fantasy RPG'},en:{label:'DnD Fantasy',sub:'Fantasy RPG'},val:'fantasy RPG character, tiefling, dark fantasy inn, tavern, gritty realism'},{he:{label:'לוחמת עתיד',sub:'Combat Cyborg'},en:{label:'Combat Cyborg',sub:'Female Warrior'},val:'female combat cyborg, cracked synthetic skin, mechanical components, post-apocalyptic'}]},
  { he:{title:'📐 מצלמה'},en:{title:'📐 Camera'},tags:[{he:{label:'מלמטה למעלה',sub:'Low Angle'},en:{label:'Low Angle',sub:'Power Shot'},val:'low angle shot, worms eye view, dramatic perspective, dominant framing'},{he:{label:'מבט ציפור',sub:"Bird's Eye"},en:{label:"Bird's Eye View",sub:'Top Down'},val:'birds eye view, overhead shot, top-down perspective, aerial composition'},{he:{label:'תקריב',sub:'Close Up'},en:{label:'Close-Up',sub:'Tight Shot'},val:'close-up shot, tight framing, face detail, extreme proximity'},{he:{label:'שוט רחב',sub:'Wide Shot'},en:{label:'Wide Shot',sub:'Establishing Shot'},val:'wide shot, establishing shot, full environment, expansive framing'},{he:{label:'POV',sub:'Point of View'},en:{label:'POV',sub:'First Person'},val:'point of view shot, first person perspective, immersive POV'},{he:{label:'זווית הולנדית',sub:'Tilted Camera'},en:{label:'Dutch Angle',sub:'Tilted Camera'},val:'dutch angle, tilted camera, diagonal framing, tension composition'},{he:{label:'עדשה רגילה',sub:'Standard Lens'},en:{label:'Standard Lens',sub:'Standard Lens'},val:'50mm lens, eye-level perspective, natural perspective, standard focal length'},{he:{label:'עדשת פורטרט',sub:'Portrait Lens'},en:{label:'Portrait Lens',sub:'Portrait Lens'},val:'85mm portrait lens, compressed background, flattering perspective, sharp subject'},{he:{label:'שוט הירו',sub:'Hero Shot'},en:{label:'Hero Shot',sub:'Movie Poster'},val:'hero shot, poster composition, vertical framing, full body, iconic stance'}]},
  { he:{title:'👗 אופנה'},en:{title:'👗 Fashion'},tags:[{he:{label:'עיתוני אופנה',sub:'Fashion Editorial'},en:{label:'Fashion Editorial',sub:'Magazine Style'},val:'high fashion editorial, magazine cover, luxury styling, professional fashion photography'},{he:{label:'חליפה רשמית',sub:'Formal Suit'},en:{label:'Formal Suit',sub:'Business Fashion'},val:'tailored three-piece suit, power dressing, Italian wool, elegant'},{he:{label:'אבנגארד',sub:'Avant-Garde'},en:{label:'Avant-Garde',sub:'Experimental Fashion'},val:'avant-garde fashion, oversized silhouette, billowing fabric, experimental styling'},{he:{label:'לוקסוס כהה',sub:'Dark Luxury'},en:{label:'Dark Luxury',sub:'Gothic Glamour'},val:'dark luxury fashion, oxblood velvet, obsidian silk, antique gold embroidery, restrained glamour'}]},
  { he:{title:'🌍 מראה'},en:{title:'🌍 Appearance'},tags:[{he:{label:'ישראלי / ערבי',sub:'ים תיכוני'},en:{label:'Israeli / Arab',sub:'Mediterranean'},val:'Mediterranean appearance, olive honey skin tone, dark brown eyes, black wavy hair, Levantine features'},{he:{label:'אפריקאי/ת',sub:'עור כהה עמוק'},en:{label:'African',sub:'Deep Rich Skin'},val:'African descent, deep ebony skin, chestnut brown complexion, coiled black hair, strong facial structure'},{he:{label:'אסיאתי/ת מזרחי/ת',sub:'יפן / קוריאה'},en:{label:'East Asian',sub:'Japan / Korea'},val:'East Asian features, pale rice-beige skin, almond-shaped eyes, straight black hair, smooth skin texture'},{he:{label:'דרום-מזרח אסיה',sub:'תאילנד / אינדו'},en:{label:'Southeast Asian',sub:'Thai / Indonesian'},val:'Southeast Asian appearance, warm tan skin, milk tea complexion, dark eyes, dark straight hair'},{he:{label:'אירופי/ת צפוני/ת',sub:'סקנדינביה'},en:{label:'Northern European',sub:'Scandinavian'},val:'Northern European features, fair porcelain ivory skin, blonde hair, blue or green eyes, light complexion'},{he:{label:'אירופי/ת דרומי/ת',sub:'איטליה / ספרד'},en:{label:'Southern European',sub:'Italian / Spanish'},val:'Southern European appearance, warm sand beige skin, dark brown hair, expressive eyes, Mediterranean look'},{he:{label:'לטיני/ת',sub:'מקסיקו / ברזיל'},en:{label:'Latino / Latina',sub:'Mexico / Brazil'},val:'Latino appearance, caramel dulce de leche skin, dark wavy hair, warm brown eyes, vibrant features'},{he:{label:'הינדי / דרום-אסיה',sub:'הודו / פקיסטן'},en:{label:'South Asian',sub:'India / Pakistan'},val:'South Asian features, golden cinnamon skin tone, dark expressive eyes, black hair, warm undertones'},{he:{label:'מזרח-תיכון / פרסי',sub:'איראן / טורקיה'},en:{label:'Middle Eastern / Persian',sub:'Iran / Turkey'},val:'Middle Eastern appearance, warm olive skin, amber honey tone, dark almond eyes, defined facial features'},{he:{label:'אפרו-קריבי',sub:"ג'מייקה"},en:{label:'Afro-Caribbean',sub:'Jamaica / Trinidad'},val:'Afro-Caribbean appearance, warm cocoa complexion, dark lively eyes, natural curly or coiled hair'},{he:{label:'סלאבי / רוסי',sub:'רוסיה / אוקראינה'},en:{label:'Slavic / Russian',sub:'Russia / Ukraine'},val:'Slavic features, light cream skin, high cheekbones, blue or gray eyes, light brown or blonde hair'},{he:{label:'מזרח אפריקאי',sub:'אתיופיה / סומליה'},en:{label:'East African',sub:'Ethiopia / Somalia'},val:'East African features, deep sable skin, elongated facial structure, dark eyes, sharp elegant features'}]},
  { he:{title:'💇 גוף'},en:{title:'💇 Body'},tags:[{he:{label:'שיער ישר שחור',sub:'Black Straight'},en:{label:'Black Straight Hair',sub:'Silky Smooth'},val:'straight black hair, silky smooth texture, glossy dark hair, sleek'},{he:{label:'שיער מתולתל',sub:'Natural Curls'},en:{label:'Curly Hair',sub:'Natural Coils'},val:'natural curly hair, coiled texture, voluminous afro curls, defined ringlets'},{he:{label:'שיער בלונד',sub:'Golden Blonde'},en:{label:'Blonde Hair',sub:'Golden Blonde'},val:'golden blonde hair, light blonde, honey highlights, fine blonde strands'},{he:{label:'שיער גלי כהה',sub:'Dark Waves'},en:{label:'Dark Wavy Hair',sub:'Mediterranean Waves'},val:'dark wavy hair, Mediterranean waves, thick dark hair, natural movement'},{he:{label:'עור פורצלן',sub:'Fair Ivory'},en:{label:'Porcelain Skin',sub:'Fair Ivory'},val:'porcelain fair skin, ivory complexion, pale alabaster skin tone, flawless light skin'},{he:{label:'עור זית חם',sub:'Mediterranean'},en:{label:'Warm Olive Skin',sub:'Mediterranean Glow'},val:'warm olive skin tone, Mediterranean glow, golden honey complexion, sun-kissed olive'},{he:{label:'עור קאראמל',sub:'Golden Tan'},en:{label:'Caramel Skin',sub:'Golden Tan'},val:'caramel skin tone, golden tan complexion, warm brown undertones, dulce de leche skin'},{he:{label:'עור כהה עמוק',sub:'Deep Ebony'},en:{label:'Deep Dark Skin',sub:'Rich Ebony'},val:'deep ebony skin, rich dark complexion, velvet mahogany skin tone, dark chocolate skin'},{he:{label:'עור זוהר',sub:'Bronze Glow'},en:{label:'Bronzed Glow',sub:'Golden Undertone'},val:'bronzed skin with golden undertones, dewy healthy glow, luminous complexion, warm bronze'}]},
  { he:{title:'🌆 סביבה'},en:{title:'🌆 Environment'},tags:[{he:{label:'כוכב לכת זר',sub:'Alien Planet'},en:{label:'Alien Planet',sub:'Sci-Fi Landscape'},val:'alien planet landscape, barren rocky terrain, deep space sky, distant Earth, spaceship background'},{he:{label:"ג\u05f3ונגל גשם",sub:'Rainforest'},en:{label:'Rainforest',sub:'Misty Valley'},val:'moss-covered limestone cliff, misty rainforest valley, overgrown vegetation, dramatic nature'},{he:{label:'אפוקליפסה',sub:'Post-Apocalyptic'},en:{label:'Post-Apocalyptic',sub:'Ruined Future'},val:'ruined futuristic landscape, post-apocalyptic city ruins, morning fog, desolate vast environment'},{he:{label:'פונדק פנטזיה',sub:'Fantasy Inn'},en:{label:'Fantasy Tavern',sub:'Medieval Inn'},val:'dimly lit fantasy tavern, medieval inn, stone fireplace, bubbling glass lanterns, warm bokeh'},{he:{label:'מסלול כוכבים',sub:'Meteor Shower'},en:{label:'Meteor Shower',sub:'Stargazing'},val:'ancient stone ruins under night sky, meteor shower, Milky Way visible, celestial wonder'},{he:{label:'ענני חלום',sub:'Dream Clouds'},en:{label:'Dreamy Clouds',sub:'Cloud Kingdom'},val:'lying on soft cotton clouds, golden hour sky, dreamlike gravity-defying, pastel orange atmosphere'},{he:{label:'קרנבל',sub:'Vintage Carnival'},en:{label:'Pastel Carnival',sub:'Vintage Fairground'},val:'pastel-colored vintage carnival, Ferris wheel, fairground atmosphere, warm golden light, nostalgic'}]},
  { he:{title:'🔮 אסתטיקה'},en:{title:'🔮 Aesthetic'},tags:[{he:{label:'פסיפס זהוב',sub:'Gold Mosaic'},en:{label:'Gold Mosaic',sub:'Luxury Portrait'},val:'gold mosaic portrait, reflective golden tiles, luxury gold texture, intricate gold fragments, baroque'},{he:{label:'קרח שבור',sub:'Broken Ice'},en:{label:'Broken Ice',sub:'Ice Plate'},val:'broken ice plate, hand pressed against ice, wet surface reflection, crystalline texture, ice shards'},{he:{label:'יוקרה כהה',sub:'Dark Prestige'},en:{label:'Dark Prestige',sub:'Noir Luxury'},val:'dark prestige editorial, noir luxury aesthetic, black velvet atmosphere, cinematic high-fashion, shadow and light'},{he:{label:'נפחיה עתיקה',sub:'Medieval Forge'},en:{label:'Medieval Forge',sub:'Blacksmith'},val:'medieval blacksmith forge, incandescent metal, flying sparks, chiaroscuro forge lighting, leather apron'},{he:{label:'עלייה רוחנית',sub:'Spiritual Rising'},en:{label:'Spiritual Rising',sub:'Resurrection'},val:'spiritual awakening symbolism, light breaking through darkness, hope and redemption, ethereal atmosphere'}]},
  { he:{title:'😊 הבעה'},en:{title:'😊 Expression'},tags:[{he:{label:'חיוך',sub:'Smiling'},en:{label:'Smiling',sub:'Happy Expression'},val:'smiling, warm genuine smile, happy expression, joyful face'},{he:{label:'רציני',sub:'Serious'},en:{label:'Serious',sub:'Stern Look'},val:'serious expression, stern look, neutral face, focused gaze'},{he:{label:'נחוש',sub:'Determined'},en:{label:'Determined',sub:'Fierce Look'},val:'determined expression, fierce look, strong willpower, intense focus'},{he:{label:'חלומי',sub:'Dreamy'},en:{label:'Dreamy',sub:'Soft Gaze'},val:'dreamy expression, soft gaze, distant look, romantic mood'},{he:{label:'מופתע',sub:'Surprised'},en:{label:'Surprised',sub:'Shocked'},val:'surprised expression, wide eyes, shocked look, mouth open'},{he:{label:'בטוח בעצמו',sub:'Confident'},en:{label:'Confident',sub:'Bold Look'},val:'confident expression, bold look, self-assured pose, strong presence'},{he:{label:'עצוב',sub:'Sad'},en:{label:'Sad',sub:'Melancholic'},val:'sad expression, melancholic look, teary eyes, emotional face'},{he:{label:'מסתורי',sub:'Mysterious'},en:{label:'Mysterious',sub:'Enigmatic'},val:'mysterious expression, enigmatic smile, secretive look, half shadow'}]},
  { he:{title:'🧍 פוזה'},en:{title:'🧍 Pose'},tags:[{he:{label:'גוף מלא',sub:'Full Body'},en:{label:'Full Body',sub:'Head to Toe'},val:'full body shot, head to toe, complete figure, standing pose'},{he:{label:'חצי גוף',sub:'Half Body'},en:{label:'Half Body',sub:'Waist Up'},val:'upper body shot, waist up, portrait framing, torso visible'},{he:{label:'קאובוי שוט',sub:'Mid Shot'},en:{label:'Cowboy Shot',sub:'Thigh Up'},val:'cowboy shot, medium shot, thighs up, classic Western framing'},{he:{label:'יושב',sub:'Sitting'},en:{label:'Sitting',sub:'Seated Pose'},val:'sitting pose, seated, relaxed seated position, chair or ground'},{he:{label:'שוכב',sub:'Lying Down'},en:{label:'Lying Down',sub:'Reclining'},val:'lying down, reclining pose, horizontal composition, resting position'},{he:{label:'אקשן',sub:'Dynamic Action'},en:{label:'Dynamic Action',sub:'Motion Pose'},val:'dynamic action pose, movement, energetic stance, mid-action freeze'},{he:{label:'מסתכל למצלמה',sub:'Looking at Camera'},en:{label:'Looking at Camera',sub:'Direct Gaze'},val:'looking at camera, direct eye contact, facing viewer, engaging gaze'},{he:{label:'גב לצלם',sub:'Back View'},en:{label:'Back View',sub:'From Behind'},val:'back view, seen from behind, rear shot, looking away from camera'}]},
  { he:{title:'🖌️ צבעים'},en:{title:'🖌️ Colors'},tags:[{he:{label:'עז וצבעוני',sub:'Vibrant'},en:{label:'Vibrant',sub:'Bold Colors'},val:'vibrant colors, bold saturated palette, vivid colorful, high saturation'},{he:{label:'פסטל',sub:'Soft Pastels'},en:{label:'Pastel',sub:'Soft Tones'},val:'pastel palette, soft muted tones, light delicate colors, dreamy pastels'},{he:{label:'שחור-לבן',sub:'Monochrome'},en:{label:'Black and White',sub:'Monochrome'},val:'black and white, monochrome, grayscale, timeless B&W photography'},{he:{label:'צבעים חמים',sub:'Warm Tones'},en:{label:'Warm Tones',sub:'Amber and Orange'},val:'warm color palette, amber tones, orange and red hues, warm cozy atmosphere'},{he:{label:'צבעים קרים',sub:'Cool Tones'},en:{label:'Cool Tones',sub:'Blue and Teal'},val:'cool color palette, blue and teal tones, cold atmosphere, icy hues'},{he:{label:'מונוכרום',sub:'Single Color'},en:{label:'Monochrome',sub:'One Hue'},val:'monochromatic palette, single hue variations, tonal harmony, one dominant color'},{he:{label:'ניגוד גבוה',sub:'High Contrast'},en:{label:'High Contrast',sub:'Bold Contrast'},val:'high contrast colors, bold dark and light, dramatic contrast, vivid opposition'},{he:{label:'גוונות אדמה',sub:'Natural Colors'},en:{label:'Earth Tones',sub:'Natural Colors'},val:'earth tones, natural colors, brown and terracotta, organic warm palette'}]},
  { he:{title:'🧸 צעצועים'},en:{title:'🧸 Toys'},tags:[{he:{label:'פיגורינה באריזה'},en:{label:'Action Figure Box'},val:'action figure box packaging, collectible toy display, plastic window, retail packaging, character accessories'},{he:{label:'לגו מיניפיגור'},en:{label:'LEGO Minifigure'},val:'LEGO minifigure style, blocky proportions, yellow face, classic plastic toy aesthetic, geometric shapes'},{he:{label:'פאנקו פופ'},en:{label:'Funko Pop Style'},val:'Funko Pop vinyl figure, oversized head, tiny body, black bead eyes, collectible figurine design'},{he:{label:'ציידן צבעוני'},en:{label:'Chibi Figurine'},val:'chibi 3D figurine, oversized cute head, tiny body, soft rounded shapes, pastel colors, adorable collectible'},{he:{label:'בובת ברבי באריזה'},en:{label:'Barbie Box Style'},val:'Barbie doll box aesthetic, pink packaging, fashion doll clear window, branded toy packaging design'},{he:{label:'צלמית חרס'},en:{label:'Clay Figurine'},val:'handmade clay figurine, artisan ceramic sculpture, textured surface, whimsical character crafted art'},{he:{label:'דגם תלת-מימד'},en:{label:'3D Printed Model'},val:'3D printed figurine, layer lines visible, matte plastic finish, precise geometric detail, maker aesthetic'}]},
  { he:{title:'📷 סגנון ישן ורגיל'},en:{title:'📷 Raw & Candid'},tags:[{he:{label:'מצלמה חד-פעמית'},en:{label:'Disposable Camera'},val:'disposable camera aesthetic, slightly blurry, red-eye flash, overexposed edges, nostalgic grain, casual snapshot'},{he:{label:'פולארויד'},en:{label:'Polaroid Shot'},val:'polaroid instant photo, white border frame, faded colors, nostalgic snapshot, soft focus imperfect'},{he:{label:'פלאש מקרי'},en:{label:'Accidental Flash'},val:'accidental flash photography, harsh direct light, blown highlights, casual unposed candid moment'},{he:{label:'טשטוש תנועה'},en:{label:'Motion Blur Candid'},val:'motion blur candid shot, subject in motion, natural movement, street photography dynamic blur'},{he:{label:'גרעין לו-פיי'},en:{label:'Lo-Fi Grain'},val:'heavy film grain, lo-fi aesthetic, analog noise texture, gritty raw look, imperfect analog beauty'},{he:{label:'שריפת סרט'},en:{label:'Film Burn'},val:'film burn effect, light leak at edges, orange red streaks, analog film damage, vintage imperfection'},{he:{label:'תמונה מוצאת'},en:{label:'Found Photo'},val:'found photo aesthetic, creased edges, faded colors, mystery candid snapshot, old photograph'}]},
  { he:{title:'🃏 קריקטורה'},en:{title:'🃏 Caricature'},tags:[{he:{label:'קריקטורה אישית'},en:{label:'Personal Caricature'},val:'personal caricature, exaggerated facial features, cartoon style, job props, humorous portrait illustration'},{he:{label:'אבטר קרטון'},en:{label:'Cartoon Avatar'},val:'cartoon avatar, simplified stylized face, bold outlines, flat colors, profile picture digital illustration'},{he:{label:'קריקטורה מקצועית'},en:{label:'Job Caricature'},val:'profession caricature, exaggerated work tools, funny career accessories, humorous job illustration'},{he:{label:'אבטר פיקסל ארט'},en:{label:'Pixel Avatar'},val:'pixel art character avatar, 16-bit style, retro game character, grid aesthetic, small resolution'},{he:{label:'מסקוט מותג'},en:{label:'Brand Mascot'},val:'brand mascot design, friendly character, consistent style, expressive personality, commercial illustration'},{he:{label:'דיוקן קומיקס'},en:{label:'Comic Self-Portrait'},val:'comic book self-portrait, halftone dots, bold outlines, vibrant colors, graphic novel illustration'}]},
  { he:{title:'🐾 חיות'},en:{title:'🐾 Animals'},tags:[{he:{label:'פורטרט חיית מחמד'},en:{label:'Pet Portrait'},val:'detailed pet portrait, expressive animal eyes, soft fur texture, natural lighting, intimate animal photography'},{he:{label:'חיות בר'},en:{label:'Wildlife in Nature'},val:'wildlife photography, animal in natural habitat, golden hour, National Geographic style, nature documentary'},{he:{label:'מאקרו חרק'},en:{label:'Macro Insect'},val:'macro insect photography, extreme close-up, compound eyes detail, intricate wing patterns, fine insect'},{he:{label:'יצור ימי'},en:{label:'Marine Life'},val:'underwater marine life, coral reef, bioluminescent ocean creature, vivid ocean colors, sea photography'},{he:{label:'ציפור טרף'},en:{label:'Bird of Prey'},val:'bird of prey portrait, sharp talons, piercing eyes, feather detail, dramatic sky, eagle or hawk'},{he:{label:'עדר זאבים'},en:{label:'Wolf Pack'},val:'wolf pack in winter forest, dramatic moody light, snow environment, wild predator photography'},{he:{label:'יצור פנטזיה'},en:{label:'Fantasy Creature'},val:'mythical fantasy creature, dragon or phoenix, ethereal magical being, detailed scales or feathers'},{he:{label:'דיוקן סוס'},en:{label:'Horse Portrait'},val:'dramatic horse portrait, flowing mane, muscular form, golden hour backlight, powerful animal photography'}]},
  { he:{title:'✨ אפקטים'},en:{title:'✨ Visual FX'},tags:[{he:{label:'חשיפה כפולה'},en:{label:'Double Exposure'},val:'double exposure effect, two images merged, silhouette filled with landscape, artistic blend, dreamy overlay'},{he:{label:'אורות דולפים'},en:{label:'Light Leaks'},val:'light leak effect, warm orange pink streaks at edges, analog film light exposure, vintage imperfection'},{he:{label:'זכוכית מנופצת'},en:{label:'Shattered Glass'},val:'shattered glass effect, cracks radiating from center, broken mirror dramatic fragmentation'},{he:{label:'אפקט גליץ'},en:{label:'Glitch Effect'},val:'digital glitch effect, RGB color split, data corruption aesthetic, pixel displacement, cyberpunk distortion'},{he:{label:'אור פריזמה'},en:{label:'Prismatic Light'},val:'prismatic light refraction, rainbow spectrum dispersion, crystal light split, geometric light patterns'},{he:{label:'עשן וערפל'},en:{label:'Smoke and Fog'},val:'smoke and fog atmosphere, swirling mist, mysterious haze, ethereal smoke trails, soft diffused forms'},{he:{label:'שיקוף מראה'},en:{label:'Mirror Reflection'},val:'perfect mirror reflection, symmetrical composition, still water reflection, surreal mirrored world'},{he:{label:'אפקט הולוגרמה'},en:{label:'Holographic Effect'},val:'holographic iridescent surface, rainbow metallic sheen, shifting color spectrum, futuristic finish'}]},
  { he:{title:'🎞️ סגנון סרטים'},en:{title:'🎞️ Cinematic Style'},tags:[{he:{label:'וס אנדרסון'},en:{label:'Wes Anderson Style'},val:'Wes Anderson aesthetic, symmetrical composition, pastel color palette, flat graphic quirky precise framing'},{he:{label:'בלייד ראנר'},en:{label:'Blade Runner Noir'},val:'Blade Runner noir aesthetic, rain-slicked streets, neon reflections, dense fog, dystopian cityscape'},{he:{label:'ונג קר-ווי'},en:{label:'Wong Kar-Wai Blur'},val:'Wong Kar-Wai visual style, motion blur, warm saturated tones, melancholic mood, slow shutter street'},{he:{label:'פרספקטיבת קובריק'},en:{label:'Kubrick Perspective'},val:'Stanley Kubrick one-point perspective, symmetrical hallway, cold clinical lighting, geometric framing'},{he:{label:'גיאלו איטלקי'},en:{label:'Giallo Color Grade'},val:'Italian Giallo color grading, saturated reds and blues, theatrical lighting, vivid surreal palette'},{he:{label:'סרט שנות 70'},en:{label:'70s Film Look'},val:'70s film aesthetic, warm brown tones, soft focus, grainy film stock, natural organic nostalgic mood'},{he:{label:'IMAX אפי'},en:{label:'IMAX Epic Shot'},val:'IMAX epic wide shot, massive scale, sweeping landscape, premium cinema quality, breathtaking'}]},
  { he:{title:'🧱 חומרים'},en:{title:'🧱 Materials'},tags:[{he:{label:'שיש מבריק'},en:{label:'Polished Marble'},val:'polished marble surface, white grey veining, glossy reflective finish, luxury stone texture'},{he:{label:'עור ישן'},en:{label:'Aged Leather'},val:'aged leather texture, natural grain, worn patina, warm brown tones, tactile surface detail'},{he:{label:'מתכת מוברשת'},en:{label:'Brushed Metal'},val:'brushed aluminum texture, directional grain lines, industrial matte finish, metallic surface'},{he:{label:'עץ ישן'},en:{label:'Weathered Wood'},val:'weathered wood texture, natural grain pattern, aged patina, cracked paint, rustic organic surface'},{he:{label:'קטיפה רכה'},en:{label:'Soft Velvet'},val:'soft velvet fabric texture, deep pile, rich saturated color, luxurious tactile sheen'},{he:{label:'זכוכית שקופה'},en:{label:'Clear Glass'},val:'clear glass material, light refraction, transparency and reflection, crystal surface imperfections'},{he:{label:'בטון גולמי'},en:{label:'Raw Concrete'},val:'raw concrete texture, aggregate surface, industrial material, matte grey finish, brutal texture'},{he:{label:'בד גס'},en:{label:'Rough Linen'},val:'rough linen fabric texture, natural fiber weave, neutral earth tone, artisan textile woven surface'}]},
  { he:{title:'🏙️ בניינים וחדרים'},en:{title:'🏙️ Architecture & Interior'},tags:[{he:{label:'חדר יפני מינימליסטי'},en:{label:'Japanese Interior'},val:'Japanese minimalist interior, wabi-sabi aesthetic, natural wood, paper screens, zen calm warm light'},{he:{label:'לופט תעשייתי'},en:{label:'Industrial Loft'},val:'industrial loft interior, exposed brick wall, steel beams, concrete floor, high ceiling urban raw'},{he:{label:'ברוטליזם'},en:{label:'Brutalist'},val:'brutalist concrete architecture, massive geometric forms, raw exposed concrete, monumental scale'},{he:{label:'אולם גותי'},en:{label:'Gothic Cathedral Interior'},val:'gothic cathedral interior, soaring stone arches, stained glass light, dramatic vertical medieval space'},{he:{label:'בית זכוכית מודרני'},en:{label:'Modern Glass House'},val:'modern glass house architecture, floor-to-ceiling windows, clean lines, minimal interior exterior'},{he:{label:'מבנה נטוש'},en:{label:'Abandoned Building'},val:'abandoned building interior, peeling paint, broken windows, nature reclaiming, urban decay beauty'},{he:{label:'מדרגות דרמטיות'},en:{label:'Dramatic Staircase'},val:'dramatic architectural staircase, sweeping curves, grand proportions, natural light from above sculptural'}]},
  { he:{title:'🌿 טבע מקרוב'},en:{title:'🌿 Nature Up Close'},tags:[{he:{label:'אבן עם טחב'},en:{label:'Moss Covered Stone'},val:'moss covered stone surface, vibrant green texture, damp forest floor, macro detail, lush organic growth'},{he:{label:'טיפות בוקר'},en:{label:'Morning Dew Drops'},val:'morning dew drops on leaf, macro photography, spherical droplets, translucent light, fresh nature'},{he:{label:'שורשי עץ עתיק'},en:{label:'Ancient Tree Roots'},val:'massive ancient tree roots, gnarled twisted forms, forest floor, dramatic scale, old growth forest'},{he:{label:'שונית אלמוגים'},en:{label:'Colorful Coral Reef'},val:'colorful coral reef underwater, vivid marine ecosystem, tropical fish, clear turquoise water'},{he:{label:'יער זוהר'},en:{label:'Bioluminescent Forest'},val:'bioluminescent forest at night, glowing plants and fungi, magical blue-green light, mystical woods'},{he:{label:'פרחי דובדבן נופלים'},en:{label:'Cherry Blossom Rain'},val:'cherry blossom petals falling, pink soft bokeh, spring atmosphere, Japanese garden delicate beauty'},{he:{label:'חולות מדבר'},en:{label:'Desert Sand Dunes'},val:'desert sand dunes, wind-sculpted patterns, warm golden light, minimalist vast landscape, abstract forms'}]},
  { he:{title:'🌊 מזג אוויר'},en:{title:'🌊 Weather'},tags:[{he:{label:'סערת ברק'},en:{label:'Lightning Storm'},val:'dramatic lightning storm, electric sky, dark storm clouds, powerful lightning bolt, atmospheric energy'},{he:{label:'ערפל בוקר'},en:{label:'Morning Fog'},val:'morning fog rolling through landscape, soft diffused light, mysterious atmosphere, muted dreamy haze'},{he:{label:'שלג ראשון'},en:{label:'First Snow'},val:'first snow fall, clean white landscape, soft quiet atmosphere, snow-covered branches, winter stillness'},{he:{label:'זוהר צפוני'},en:{label:'Northern Lights'},val:'northern lights aurora borealis, green purple sky, star night, arctic landscape, natural phenomenon'},{he:{label:'סופת חול'},en:{label:'Sandstorm'},val:'dramatic sandstorm approaching, orange dust wall, desert landscape, apocalyptic survival mood'},{he:{label:'גשם ניאון'},en:{label:'Neon Rain'},val:'heavy rain with neon reflections, wet street puddles, colorful light streaks, urban night storm noir'},{he:{label:'גלי ים'},en:{label:'Massive Ocean Waves'},val:'massive ocean waves crashing, powerful water force, dramatic spray, seascape raw nature power'}]},
  { he:{title:'📱 טרנדים'},en:{title:'📱 Trends'},tags:[{he:{label:'אולד מאני'},en:{label:'Old Money'},val:'old money aesthetic, vintage luxury, classical European setting, understated elegance, timeless film texture'},{he:{label:"קוטאג\u05f3קור"},en:{label:'Cottagecore'},val:'cottagecore aesthetic, pastoral countryside, wildflowers, rustic charm, soft natural romantic rural'},{he:{label:'דארק אקדמיה'},en:{label:'Dark Academia'},val:'dark academia aesthetic, old library, candlelight, leather books, scholarly gothic intellectual mood'},{he:{label:'סולארפאנק'},en:{label:'Solarpunk'},val:'solarpunk aesthetic, green sustainable utopia, solar panels with nature, optimistic eco-future lush'},{he:{label:'וייפרוויב'},en:{label:'Vaporwave'},val:'vaporwave aesthetic, pink cyan palette, 80s retro-digital, Greek statues, glowing grid nostalgia'},{he:{label:'Y2K'},en:{label:'Y2K Aesthetic'},val:'Y2K aesthetic, year 2000 style, chrome metallic, butterfly motifs, early internet nostalgia'},{he:{label:'בארביקור'},en:{label:'Barbiecore'},val:'Barbiecore aesthetic, hot pink everything, maximalist glamour, plastic fantastic bold feminine'},{he:{label:'היגה קאזי'},en:{label:'Hygge Cozy'},val:'hygge cozy aesthetic, warm soft candlelight, knit blankets, comfort warmth, Scandinavian calm'}]},
  { he:{title:'🎮 משחקים'},en:{title:'🎮 Game Design'},tags:[{he:{label:'גיים ארט איזומטרי'},en:{label:'Isometric Game Art'},val:'isometric game art, top-down 45 degree view, clean geometric world, indie game tile-based design'},{he:{label:'קונספט ארט RPG'},en:{label:'RPG Fantasy'},val:'RPG character concept art, fantasy warrior design, detailed armor weapons, artstation quality'},{he:{label:'מפת פנטזיה'},en:{label:'Fantasy Map'},val:'hand-drawn fantasy map, illustrated terrain, decorative borders, medieval cartography adventure world'},{he:{label:'אייקון UI'},en:{label:'Game UI Icon'},val:'game UI icon design, inventory item style, glowing magical item, fantasy pixel clear silhouette'},{he:{label:'בוס מסוכן'},en:{label:'Boss Character'},val:'imposing boss character design, intimidating scale, unique silhouette, dramatic lighting concept art'},{he:{label:'נוף פיקסל ארט'},en:{label:'Pixel Landscape'},val:'pixel art landscape, 16-bit color palette, retro game environment, chunky pixel nostalgic world'}]},
  { he:{title:'🖼️ פוסטרים'},en:{title:'🖼️ Posters'},tags:[{he:{label:'פוסטר קונצרט'},en:{label:'Vintage Concert Poster'},val:'vintage concert poster design, psychedelic lettering, 60s 70s hand-drawn aesthetic, bold colors'},{he:{label:'עיצוב באוהאוס'},en:{label:'Bauhaus Design'},val:'Bauhaus design aesthetic, primary colors, geometric shapes, functional modernism, clean layout'},{he:{label:'כריכת ספר'},en:{label:'Book Cover Art'},val:'book cover art composition, typographic hierarchy, atmospheric illustration, genre mood publisher quality'},{he:{label:'פוסטר טיולים'},en:{label:'Vintage Travel Poster'},val:'vintage travel poster, retro illustration, bold flat colors, art deco typography, destination graphic'},{he:{label:'פוסטר סרט'},en:{label:'Movie Poster'},val:'cinematic movie poster composition, hero character central, dramatic lighting, title space marketing'},{he:{label:'עיצוב שוויצרי'},en:{label:'Swiss Design Style'},val:'Swiss international typographic style, grid-based layout, Helvetica-inspired, clean rational minimalism'}]},
  { he:{title:'🤗 נוסטלגיה'},en:{title:'🤗 Nostalgia'},tags:[{he:{label:'זיכרון ילדות'},en:{label:'Childhood Memory'},val:'childhood memory scene, warm nostalgic light, soft focus, playing children, innocent joy emotional warmth'},{he:{label:'אלבום תמונות ישן'},en:{label:'Old Photo Album'},val:'old photo album aesthetic, vintage family photos, yellowed pages, handwritten captions, personal history'},{he:{label:'פגישה עם עצמך'},en:{label:'Meeting Younger Self'},val:'adult embracing younger childhood self, emotional reunion, nostalgic setting, past meets present tender'},{he:{label:'כיתה שנות 90'},en:{label:'90s Classroom'},val:'90s classroom aesthetic, old school desks, VHS player, dated technology, nostalgic school atmosphere'},{he:{label:'חדר ילדות'},en:{label:'Childhood Bedroom'},val:'childhood bedroom scene, favorite toys, vintage posters, warm lamplight, nostalgic safe personal space'},{he:{label:'שקיעה מוכרת'},en:{label:'Familiar Sunset'},val:'emotionally resonant sunset, familiar neighborhood skyline, golden hour warmth, bittersweet feeling home'}]},
  { he:{title:'🌱 עתיד ירוק'},en:{title:'🌱 Green Future'},tags:[{he:{label:'עיר ירוקה'},en:{label:'Solarpunk City'},val:'solarpunk city, buildings covered in plants, solar panels, clean energy, utopian green architecture'},{he:{label:'גן אנכי'},en:{label:'Vertical Garden'},val:'vertical garden wall, lush plant coverage on building facade, urban green living architecture'},{he:{label:'אנרגיה מתחדשת'},en:{label:'Renewable Energy'},val:'wind turbines at sunset, clean energy landscape, peaceful power generation, environmental optimism'},{he:{label:'ים נקי'},en:{label:'Clean Ocean'},val:'clean ocean scene, transparent turquoise water, healthy coral, marine conservation, pristine natural'},{he:{label:'כפר אקולוגי'},en:{label:'Eco Village'},val:'eco village community, sustainable homes, permaculture gardens, off-grid living, harmonious nature'},{he:{label:'עיר מחדשת'},en:{label:'Rewilded City'},val:'rewilded urban space, nature reclaiming city, wildflowers in streets, urban jungle green renewal'}]},
  { he:{title:'🏆 פרופיל מקצועי'},en:{title:'🏆 Personal Brand'},tags:[{he:{label:'פורטרט LinkedIn'},en:{label:'LinkedIn Portrait'},val:'professional LinkedIn headshot, neutral gradient background, approachable smile, business attire, corporate'},{he:{label:'פורטרט אדיטוריאל'},en:{label:'Editorial Portrait'},val:'editorial portrait style, creative professional, magazine quality, artistic lighting, personal brand'},{he:{label:'פורטרט הרצאה'},en:{label:'Speaker Portrait'},val:'conference speaker portrait, stage background, confident pose, professional authority, thought leader'},{he:{label:'פורטרט יזמות'},en:{label:'Entrepreneur Portrait'},val:'entrepreneur lifestyle portrait, casual professional, modern office, personal brand approachable authority'},{he:{label:'פורטרט לוקסוס'},en:{label:'Luxury Brand Portrait'},val:'luxury personal brand portrait, high-end styling, premium aesthetic, aspirational lifestyle, fashion editorial'}]},
  { he:{title:'🍃 עונות השנה'},en:{title:'🍃 Seasons'},tags:[{he:{label:'פריחת אביב'},en:{label:'Spring Blossom'},val:'spring blossom season, cherry trees blooming, soft pink petals, fresh green growth, renewal and hope'},{he:{label:'עלים נשורים'},en:{label:'Autumn Leaves Falling'},val:'autumn leaves falling, warm orange red tones, golden forest floor, melancholic beauty, seasonal transition'},{he:{label:'גבישי קרח'},en:{label:'Winter Ice Crystals'},val:'winter ice crystals on glass, intricate frost patterns, cold blue tones, frozen beauty, macro ice detail'},{he:{label:'חום קיץ'},en:{label:'Summer Heat Haze'},val:'summer heat haze over road, shimmer distortion, intense golden sun, long hot day, dreamy mirage'},{he:{label:'ירח קציר'},en:{label:'Harvest Moon'},val:'harvest moon full rise, deep orange glow, low on horizon, silhouetted landscape, seasonal folklore'},{he:{label:'גשם מונסון'},en:{label:'Monsoon Rain'},val:'monsoon rain season, heavy tropical downpour, dramatic dark clouds, lush wet vegetation, powerful water'},{he:{label:'שלג חורף'},en:{label:'First Winter Snow'},val:'first snow of winter, pristine white landscape, silent stillness, snow on branches, pure seasonal magic'}]},
  { he:{title:'🌈 עולם הקסם'},en:{title:'🌈 Magic World'},tags:[{he:{label:'עולם דמיוני'},en:{label:'Magic World'},val:'magical fantasy world, enchanted realm, glowing mystical landscape, fairy tale setting'},{he:{label:'צבעי קשת'},en:{label:'Rainbow'},val:'rainbow colors, bright saturated spectrum, colorful magical sky, vibrant light rays'},{he:{label:'אווירת חלום'},en:{label:'Dreamy World'},val:'dreamlike atmosphere, soft glowing haze, floating elements, surreal gentle world'},{he:{label:'שמח וכיפי'},en:{label:'Happy & Fun'},val:'cheerful joyful mood, playful colorful scene, fun energetic vibe, happy bright world'},{he:{label:'פיות וקסם'},en:{label:'Fairies'},val:'fairy magic, tiny glowing fairies, sparkle dust, enchanted forest glow, whimsical'},{he:{label:'כוכבים קסומים'},en:{label:'Magic Stars'},val:'magical stars, glittering night sky, shooting stars, cosmic wonder, starlight glow'}]}
];

const $ = id => document.getElementById(id);
const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };
const setPlaceholder = (id, val) => { const el = $(id); if (el) el.placeholder = val; };

let currentLang = 'he';
let selected = new Set();
let lastPrompt = '';
let activeCatIdx = -1;
let kidsMode = false;
const KIDS_TITLES = new Set([
  '📸 סגנון צילום','🎨 סגנון אמנות','🎬 ז\u05f3אנר','💡 תאורה',
  '🎭 דמויות','🌆 סביבה','🔮 אסתטיקה','😊 הבעה','🧍 פוזה',
  '🖌️ צבעים','🧸 צעצועים','🃏 קריקטורה','🐾 חיות','✨ אפקטים',
  '🏙️ בניינים וחדרים','🌿 טבע מקרוב','🌊 מזג אוויר','🎮 משחקים',
  '🌱 עתיד ירוק','🍃 עונות השנה','🌈 עולם הקסם'
]);
const NEG = '--no bad anatomy, deformed hands, extra fingers, text, watermark, blurry, lowres, ugly, mutation';

const T = {
  he: {
    dir: 'rtl', lang: 'he',
    placeholder: "תאר/י את התמונה שאת/ה רוצה/ה ליצור...",
    searchPlaceholder: "חפש/י תגיות, סגנונות...",
    emptyPrompt: '✨ הפרומפט יופיע כאן — לחץ/י על 📋 העתק/י פרומפט ופתח/י את מנוע ה-AI שלך.',
    charCount: function(n) { return n + ' תווים'; },
    clearBtn: 'נקה/י', copyBtn: 'העתק/י פרומפט',
    shareBtn: 'שתף/י',
    shareTitle: 'שתף פרומפט AI', copiedBtn: '✅ הועתק/ה!',
    resultLabel: 'פרומפט מוכן', subtitle: 'מחולל פרומפטים לתמונות AI',
    categories: 'קטגוריות',
    arLabel: 'יחס:',
    fmtStory: 'סטורי', fmtSquare: 'ריבוע', fmtWide: 'רחב',
    randomBtn: 'הפתע/י אותי',
    randomHint: 'ריק? נביא לך רעיון ✨',
    kidsBtnTitle: 'כפתור לילדים', kidsBtnSub: 'מצב קסום',
    adultsBtnTitle: 'מצב מבוגרים', adultsBtnSub: 'כל הקטגוריות',
    histTitle: 'היסטוריה', histClear: 'נקה',
    ob1: 'בחר/י קטגוריה', ob2: 'בחר/י תגיות', ob3: 'תאר/י וצור/י',
    conflictTitle: '⚠️ זיהינו סתירה אפשרית',
    conflictMsg: 'הטקסט שלך מכיל ביטויים שעשויים לבלבל את ה-AI יחד עם התגיות הבאות:',
    conflictYes: 'כן, הסר/י תגיות', conflictNo: 'לא, שמור פרומפט',
    conflictWith: 'מתנגש עם:',
    clearTitle: 'מה לנקות?',
    clearAll: 'הכל', clearText: 'טקסט בלבד', clearTags: 'תגיות בלבד',
    clearCancel: 'ביטול', clearPrompt: 'נקה/י פרומפט',
  },
  en: {
    dir: 'ltr', lang: 'en',
    placeholder: "Describe the image you want to create...",
    searchPlaceholder: 'Search tags, styles...',
    emptyPrompt: '✨ Your prompt will appear here — tap 📋 Copy Prompt and open your AI tool.',
    charCount: function(n) { return n + ' chars'; },
    clearBtn: 'Clear',
    arLabel: 'Ratio:',
    fmtStory: 'Story', fmtSquare: 'Square', fmtWide: 'Wide',
    randomBtn: 'Surprise me',
    randomHint: 'Empty? We\'ll give you an idea ✨',
    kidsBtnTitle: 'Kids Button', kidsBtnSub: 'Magic mode',
    adultsBtnTitle: 'Adult Mode', adultsBtnSub: 'All categories',
    histTitle: 'History', histClear: 'Clear',
    ob1: 'Choose category', ob2: 'Select tags', ob3: 'Describe & build',
    conflictTitle: '⚠️ Possible Conflict Detected',
    conflictMsg: 'Your text may confuse the AI together with these tags:',
    conflictYes: 'Yes, remove tags', conflictNo: 'No, keep prompt',
    conflictWith: 'conflicts with:', copyBtn: 'Copy Prompt',
    shareBtn: 'Share', shareTitle: 'Share AI Prompt', copiedBtn: '✅ Copied!',
    clearTitle: 'What to clear?',
    clearAll: 'Everything', clearText: 'Text only', clearTags: 'Tags only',
    clearCancel: 'Cancel', clearPrompt: 'Clear Prompt',
    resultLabel: 'Prompt ready', subtitle: 'AI Image Prompt Builder',
    categories: 'Categories',
  }
};

function setKidsMode(isKids) {
  kidsMode = isKids;
  const kb = $('kidsBtn'), ab = $('adultsBtn');
  if (kb) kb.classList.toggle('mode-active', isKids);
  if (ab) ab.classList.toggle('mode-active', !isKids);
  buildCatGrid();
  closePanel();
  if (isKids) randomizeKids();
}

function buildCatGrid() {
  const grid = $('catGrid');
  if (!grid) { setTimeout(buildCatGrid, 50); return; }
  grid.innerHTML = '';
  DATA.forEach(function(cat, ci) {
    if (kidsMode && !KIDS_TITLES.has(cat.he.title)) return;
    const catData = cat[currentLang];
    const pill = document.createElement('button');
    pill.className = 'cat-pill';
    pill.dataset.ci = String(ci);
    const badge = document.createElement('span');
    badge.className = 'cat-badge';
    badge.id = 'badge-' + ci;
    const titleStr = catData.title;
    const emojiMatch = titleStr.match(/^(\S+)/);
    const emoji = emojiMatch ? emojiMatch[1] : '📌';
    let txt = titleStr.replace(/^\S+\s*/, '').trim();
    if (txt.length > 14) txt = txt.slice(0, 13) + '…';
    const emojiEl = document.createElement('span');
    emojiEl.className = 'cat-emoji';
    emojiEl.textContent = emoji;
    const nameEl = document.createElement('span');
    nameEl.className = 'cat-name';
    nameEl.textContent = txt;
    pill.appendChild(badge);
    pill.appendChild(emojiEl);
    pill.appendChild(nameEl);
    pill.onclick = (function(idx) { return function() { openPanel(idx); }; })(ci);
    grid.appendChild(pill);
  });
  updateBadges();
}

function openPanel(ci) {
  if (activeCatIdx === ci) { closePanel(); return; }
  activeCatIdx = ci;
  const cat = DATA[ci];
  const catData = cat[currentLang];
  document.querySelectorAll('.cat-pill').forEach(function(p, i) {
    p.classList.toggle('active', i === ci);
  });
  $('tagPanelTitle').textContent = catData.title;
  const list = $('tagList');
  list.innerHTML = '';
  cat.tags.forEach(function(t) {
    const tagData = t[currentLang];
    const btn = document.createElement('button');
    btn.className = 'tag-btn' + (selected.has(t.val) ? ' active' : '');
    btn.dataset.val = t.val;
    const text = document.createTextNode(tagData.label);
    const sub = document.createElement('span');
    sub.className = 'tag-btn-sub';
    sub.textContent = tagData.sub || '';
    btn.appendChild(text);
    btn.appendChild(sub);
    btn.onclick = (function(b, v) { return function() { toggleTag(b, v); }; })(btn, t.val);
    list.appendChild(btn);
  });
  const panel = $('tagPanel');
  panel.classList.add('open');
  if (window.innerWidth < 768) {
    setTimeout(function() { panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 60);
  }
}

function closePanel() {
  $('tagPanel').classList.remove('open');
  document.querySelectorAll('.cat-pill').forEach(function(p) { p.classList.remove('active'); });
  activeCatIdx = -1;
}

function toggleTag(btn, val) {
  if (selected.has(val)) { selected.delete(val); btn.classList.remove('active'); }
  else { selected.add(val); btn.classList.add('active'); }
  updateBadges(); updateChips(); generate();
}

function updateBadges() {
  DATA.forEach(function(cat, ci) {
    let count = 0;
    cat.tags.forEach(function(t) { if (selected.has(t.val)) count++; });
    let b = $('badge-' + ci);
    if (b) { b.textContent = count; b.classList.toggle('on', count > 0); }
  });
}

function updateChips() {
  const bar = $('selectedBar');
  bar.innerHTML = '';
  selected.forEach(function(val) {
    const chip = document.createElement('div');
    chip.className = 'sel-chip';
    const x = document.createElement('span');
    x.className = 'sel-chip-x';
    x.textContent = '✕';
    chip.appendChild(x);
    chip.appendChild(document.createTextNode(findLabel(val)));
    chip.onclick = (function(v) { return function() {
      selected.delete(v);
      document.querySelectorAll('.tag-btn').forEach(function(b) {
        if (b.dataset.val === v) b.classList.remove('active');
      });
      updateBadges(); updateChips(); generate();
    }; })(val);
    bar.appendChild(chip);
  });
}

function findLabel(val) {
  for (let i = 0; i < DATA.length; i++)
    for (let j = 0; j < DATA[i].tags.length; j++)
      if (DATA[i].tags[j].val === val) return DATA[i].tags[j][currentLang].label;
  return val.split(',')[0];
}

// ── Tag-vs-Tag Conflict Detection ────────────────────────────
const TAG_CONFLICT_MAP = [
  { a: ['photorealistic, 8k, raw photo','photorealistic, ultra detailed'],
    b: ['anime style, studio ghibli','comic book art, bold outlines','pixel art, 16-bit',
        'watercolor painting, soft edges','oil painting, brushstrokes',
        'Wes Anderson aesthetic, symmetrical composition','vaporwave aesthetic, pink and cyan palette'],
    msg_he: 'ריאליסטי מתנגש עם סגנון ציורי', msg_en: 'Realistic conflicts with illustrated style' },
  { a: ['black and white, monochrome, grayscale'],
    b: ['vibrant colors, saturated, colorful','neon lighting, colorful reflections',
        'vaporwave aesthetic, pink and cyan palette','Barbiecore aesthetic, hot pink',
        'pastel colors, soft palette'],
    msg_he: 'שחור-לבן מתנגש עם צבעים עזים', msg_en: 'Black & white conflicts with vibrant colors' },
  { a: ['night scene, moonlight, stars, dark sky','dark moody atmosphere'],
    b: ['golden hour, warm sunlight','natural daylight, bright and airy','bright studio lighting'],
    msg_he: 'תאורת לילה מתנגשת עם אור יום', msg_en: 'Night lighting conflicts with daylight' },
  { a: ['minimalist, clean, simple, white background'],
    b: ['maximalist, busy, detailed, ornate','fantasy tavern, medieval setting',
        'post-apocalyptic wasteland','cyberpunk city neon rain'],
    msg_he: 'מינימליסטי מתנגש עם סגנון עמוס', msg_en: 'Minimalist conflicts with complex style' },
  { a: ['disposable camera aesthetic','heavy film grain, lo-fi aesthetic','polaroid instant photo'],
    b: ['hyperrealistic, photorealistic, 8K HDR','fine details, sharp focus, ultra detailed'],
    msg_he: 'לו-פיי מתנגש עם רזולוציה גבוהה', msg_en: 'Lo-fi conflicts with high resolution' },
  { a: ['digital glitch effect, RGB color split'],
    b: ['bright studio lighting','clean professional photography','neutral background'],
    msg_he: 'גליץ מתנגש עם סטודיו נקי', msg_en: 'Glitch conflicts with clean studio' },
  { a: ['dramatic lightning storm','massive ocean waves crashing','sandstorm approaching'],
    b: ['golden hour, warm sunlight','natural daylight, bright and airy',
        'morning fog rolling through landscape'],
    msg_he: 'מזג אוויר קיצוני מתנגש עם אור שקט', msg_en: 'Extreme weather conflicts with calm light' },
  { a: ['vaporwave aesthetic, pink and cyan palette','Y2K aesthetic, year 2000 style'],
    b: ['photorealistic, ultra detailed','documentary style, candid'],
    msg_he: 'Vaporwave/Y2K מתנגש עם ריאליזם', msg_en: 'Vaporwave/Y2K conflicts with realism' },
  { a: ['smiling, happy, joyful expression'],
    b: ['sad, melancholic expression','crying, tears, grief'],
    msg_he: 'הבעת שמחה מתנגשת עם הבעת עצב', msg_en: 'Happy expression conflicts with sad' },
  { a: ['outdoor nature landscape','forest, trees, wilderness'],
    b: ['indoor portrait, studio','living room interior','office setting'],
    msg_he: 'חוץ מתנגש עם פנים', msg_en: 'Outdoor conflicts with indoor setting' },
];

function detectTagConflicts() {
  const conflicts = [];
  const selArr = Array.from(selected);
  for (const rule of TAG_CONFLICT_MAP) {
    const matchA = selArr.find(v => rule.a.some(a => v.toLowerCase().includes(a.toLowerCase().split(',')[0])));
    const matchB = selArr.find(v => rule.b.some(b => v.toLowerCase().includes(b.toLowerCase().split(',')[0])));
    if (matchA && matchB) {
      const already = conflicts.find(c => c.valA === matchA && c.valB === matchB);
      if (!already) conflicts.push({ valA: matchA, valB: matchB, msg_he: rule.msg_he, msg_en: rule.msg_en });
    }
  }
  return conflicts;
}

function showTagConflictModal(conflicts, onResolve, onKeep) {
  const isHe = currentLang === 'he';
  const ex = document.getElementById('tagConflictModal');
  if (ex) ex.remove();
  const tagList = conflicts.map(cf => {
    const labelA = findLabel(cf.valA) || cf.valA.split(',')[0];
    const labelB = findLabel(cf.valB) || cf.valB.split(',')[0];
    return '<div class="cm-tag-row"><span class="cm-tag-name">' + escHtml(labelA) +
      '</span><span class="cm-tag-kw"> \u2194 </span><span class="cm-tag-name">' + escHtml(labelB) +
      '</span><span class="cm-tag-kw"> \u2014 ' + escHtml(isHe ? cf.msg_he : cf.msg_en) + '</span></div>';
  }).join('');
  const modal = document.createElement('div');
  modal.id = 'tagConflictModal';
  modal.className = 'cm-overlay';
  modal.innerHTML = '<div class="cm-box"><div class="cm-title">\u26a1 ' +
    escHtml(isHe ? 'תגיות מתנגשות' : 'Conflicting Tags') + '</div>' +
    '<div class="cm-msg">' + escHtml(isHe ? 'בחרת תגיות שעשויות לבלבל את ה-AI:' : 'You selected tags that may confuse the AI:') + '</div>' +
    '<div class="cm-tags">' + tagList + '</div>' +
    '<div class="cm-btns"><button class="cm-btn cm-yes" id="tcYes">' +
    escHtml(isHe ? 'הסר תגית שנייה' : 'Remove second tag') + '</button>' +
    '<button class="cm-btn cm-no" id="tcNo">' + escHtml(isHe ? 'שמור הכל' : 'Keep all') + '</button></div></div>';
  document.body.appendChild(modal);
  document.getElementById('tcYes').onclick = function() { modal.remove(); onResolve(conflicts); };
  document.getElementById('tcNo').onclick  = function() { modal.remove(); onKeep(); };
}

// ── Text-vs-Tag Conflict Detection ───────────────────────────
const CONFLICT_MAP = [
  { kw_he: ['שחור לבן','שחור-לבן','מונוכרום','אפור'], kw_en: ['black and white','b&w','monochrome','grayscale','greyscale'],
    tags: ['vibrant colors','neon lighting','warm color','cool color','earth tones','pastel palette','high contrast colors','HDR photography'] },
  { kw_he: ['צבעוני','צבעים עזים','ססגוני'], kw_en: ['colorful','vibrant colors','saturated','vivid'],
    tags: ['black and white','monochrome','film noir'] },
  { kw_he: ['פסטל','צבעים רכים','עדין'], kw_en: ['pastel','soft colors','delicate','muted'],
    tags: ['vibrant colors','HDR photography','high contrast colors','neon lighting'] },
  { kw_he: ['ניאון','זוהר','פוצץ'], kw_en: ['neon','glowing','fluorescent'],
    tags: ['black and white','monochrome','pastel palette','earth tones'] },
  { kw_he: ['ריאליסטי','פוטוריאליסטי','צילום אמיתי','תמונה אמיתית'], kw_en: ['realistic','photorealistic','real photo','photograph','lifelike'],
    tags: ['anime style','comic book art','line art','pixel art','watercolor painting','oil painting','impressionist style','disney animation','superhero comics'] },
  { kw_he: ['אנימה','מנגה','קרטון','מצויר'], kw_en: ['anime','manga','cartoon','illustrated','drawn'],
    tags: ['photorealistic','hyperrealistic','documentary-style','8K resolution'] },
  { kw_he: ['וינטג','ישן','רטרו','עתיק'], kw_en: ['vintage','retro','old style','antique','aged','classic film'],
    tags: ['science fiction','cyberpunk','space opera','8K resolution'] },
  { kw_he: ['מינימליסטי','נקי','פשוט'], kw_en: ['minimalist','clean background','simple','minimal'],
    tags: ['intricate details','superhero comics','cyberpunk','hyperrealistic'] },
  { kw_he: ['אור יום','שמש','בהיר','אור טבעי'], kw_en: ['daylight','sunny','bright light','natural light','sunlight'],
    tags: ['night scene','dark fantasy','horror atmosphere','film noir','chiaroscuro lighting','dark prestige','blue hour','moody atmosphere'] },
  { kw_he: ['לילה','חשוך','אפל','חצות'], kw_en: ['night','dark scene','nighttime','midnight','darkness'],
    tags: ['natural daylight','golden hour','studio lighting','spotlight'] },
  { kw_he: ['שקיעה','שעת זהב','זריחה'], kw_en: ['sunset','golden hour','sunrise','dusk','dawn'],
    tags: ['night scene','blue hour','studio lighting'] },
  { kw_he: ['סטודיו','רקע לבן'], kw_en: ['studio background','white background','clean background'],
    tags: ['alien planet landscape','post-apocalyptic','misty rainforest','fantasy tavern','cyberpunk'] },
  { kw_he: ['פורטרט','פנים','תקריב','קלוז-אפ'], kw_en: ['portrait','headshot','close-up','closeup','facial'],
    tags: ['wide shot','full body shot','hero shot'] },
  { kw_he: ['שוט רחב','נוף','פנורמה','סצנה'], kw_en: ['wide shot','landscape','panorama','establishing shot','full scene'],
    tags: ['close-up shot','macro photography','upper body shot','cowboy shot'] },
  { kw_he: ['גוף מלא','מלמטה עד למעלה','עומד'], kw_en: ['full body','full length','standing pose','head to toe'],
    tags: ['close-up shot','upper body shot','cowboy shot','macro photography'] },
  { kw_he: ['שמח','שמחה','מאושר','עליז'], kw_en: ['happy','joyful','cheerful','positive mood','fun'],
    tags: ['horror atmosphere','dark fantasy','sad expression','film noir'] },
  { kw_he: ['עצוב','עצבות','דמעות','מלנכולי'], kw_en: ['sad','melancholic','crying','tearful','gloomy'],
    tags: ['smiling','confident expression','dynamic action pose','vibrant colors'] },
  { kw_he: ['אגרסיבי','כועס','לוחמני'], kw_en: ['aggressive','angry','fierce warrior','combat','battle'],
    tags: ['smiling','dreamy expression','pastel palette'] },
  { kw_he: ['רומנטי','אהבה','עדין','חלומי'], kw_en: ['romantic','love scene','gentle mood','dreamy atmosphere'],
    tags: ['horror atmosphere','dark fantasy','dynamic action pose','cyberpunk'] },
  { kw_he: ['חוץ','טבע','יער','שדה','חוף'], kw_en: ['outdoor','outside','nature scene','forest','beach exterior'],
    tags: ['studio lighting'] },
  { kw_he: ['פנים','חדר','בית','מקורה'], kw_en: ['indoor','inside room','room interior','indoors'],
    tags: ['alien planet landscape','misty rainforest','post-apocalyptic'] },
  { kw_he: ['עתידני','עתיד','טכנולוגי'], kw_en: ['futuristic','future tech','sci-fi world','technological'],
    tags: ['steampunk','retro-futuristic','medieval blacksmith'] },
  { kw_he: ['יושב','יושבת','על כיסא'], kw_en: ['sitting down','seated person','on a chair'],
    tags: ['full body shot','dynamic action pose','hero shot'] },
  { kw_he: ['שוכב','שוכבת','על הרצפה'], kw_en: ['lying down','on the floor','reclining pose','horizontal position'],
    tags: ['full body shot','dynamic action pose','hero shot','low angle shot'] },
  { kw_he: ['ריצה','קפיצה','תנועה'], kw_en: ['running','jumping','in motion','flying through'],
    tags: ['sitting pose','lying down','serious expression','dreamy expression'] },
  { kw_he: ['בלונד','שיער בלונד'], kw_en: ['blonde hair','light blonde'],
    tags: ['straight black hair','dark wavy hair','deep ebony','coiled black hair'] },
  { kw_he: ['שיער שחור','שיער כהה'], kw_en: ['black hair','dark hair'],
    tags: ['golden blonde hair','light blonde','honey highlights'] },
  // לו-פיי מתנגש עם hyperrealistic
  { kw_he: ['גרעין לו-פיי','מצלמה חד-פעמית','תמונה מוצאת'], kw_en: ['lo-fi grain','disposable camera','found photo','film burn','lo-fi analog'],
    tags: ['hyperrealistic','photographic quality','8K resolution','ultra-detailed','sharp focus subject'] },
  // glitch מתנגש עם clean/studio
  { kw_he: ['אפקט גליץ'], kw_en: ['glitch effect','digital glitch','data corruption'],
    tags: ['studio lighting','clean professional light','sharp focus subject','softbox'] },
  // סערה קיצונית מתנגש עם אור יום/שקיעה
  { kw_he: ['סערת ברק','סופת חול','גשם מונסון'], kw_en: ['lightning storm','sandstorm','monsoon rain','blizzard','hurricane'],
    tags: ['natural daylight','golden hour','bright and airy','studio lighting','spotlight'] },
  // vaporwave/Y2K מתנגש עם ריאליזם
  { kw_he: ['וייפרוויב','Y2K'], kw_en: ['vaporwave','y2k aesthetic','retro digital'],
    tags: ['photorealistic','documentary-style photography','hyperrealistic','8K resolution'] }
];

function detectConflicts(userText) {
  const txt = userText.toLowerCase();
  const conflicts = [];
  for (const rule of CONFLICT_MAP) {
    if (!rule.kw_he || !rule.kw_en || !rule.tags) continue; // safety guard
    const allKw = [...rule.kw_he, ...rule.kw_en];
    const matchedKw = allKw.find(k => txt.includes(k.toLowerCase()));
    if (!matchedKw) continue;
    for (const val of Array.from(selected)) {
      const valLow = val.toLowerCase();
      const matchedTag = rule.tags.find(tg => valLow.includes(tg.toLowerCase()));
      if (matchedTag && !conflicts.find(cf => cf.val === val)) {
        conflicts.push({ keyword: matchedKw, val, label: findLabel(val) });
      }
    }
  }
  return conflicts;
}

function showConflictModal(conflicts, onYes, onNo) {
  const isHe = currentLang === 'he';
  const t = T[currentLang];
  const ex = document.getElementById('conflictModal');
  if (ex) ex.remove();
  const tagList = conflicts.map(cf =>
    '<div class="cm-tag-row"><span class="cm-tag-name">' + escHtml(cf.label) + '</span>' +
    '<span class="cm-tag-kw">' + escHtml(t.conflictWith) + ' "' + escHtml(cf.keyword) + '"</span></div>'
  ).join('');
  const modal = document.createElement('div');
  modal.id = 'conflictModal';
  modal.className = 'cm-overlay';
  modal.innerHTML = '<div class="cm-box" dir="' + (isHe ? 'rtl' : 'ltr') + '">' +
    '<div class="cm-title">' + escHtml(t.conflictTitle) + '</div>' +
    '<div class="cm-msg">' + escHtml(t.conflictMsg) + '</div>' +
    '<div class="cm-tags">' + tagList + '</div>' +
    '<div class="cm-btns"><button class="cm-btn cm-yes" id="cmYes">' + escHtml(t.conflictYes) + '</button>' +
    '<button class="cm-btn cm-no" id="cmNo">' + escHtml(t.conflictNo) + '</button></div></div>';
  document.body.appendChild(modal);
  document.getElementById('cmYes').onclick = function() { modal.remove(); onYes(); };
  document.getElementById('cmNo').onclick  = function() { modal.remove(); onNo();  };
  modal.addEventListener('click', function(e) { if (e.target === modal) { modal.remove(); onNo(); } });
}

function _doGenerate() {
  const t = T[currentLang];
  let txt = $('userInput').value.trim();
  const el = $('finalPrompt');
  const parts = [];
  if (txt) parts.push(txt);
  const sortedVals = Array.from(selected).sort(function(a,b) { return getValPriority(a) - getValPriority(b); });
  sortedVals.forEach(function(v) { parts.push(v); });
  const arSuffix = currentAR ? ' ' + currentAR : '';
  const prompt = parts.join(', ') + arSuffix + ' ' + NEG;
  lastPrompt = prompt;
  const sb = $('shareBtn'); if (sb) sb.disabled = false;
  el.className = 'prompt-ready';
  el.textContent = prompt;
  $('charCount').textContent = t.charCount(prompt.length);
  saveHistory(prompt);
}

function generate() {
  const t = T[currentLang];
  let txt = $('userInput').value.trim();
  const el = $('finalPrompt');
  if (!txt && selected.size === 0) {
    lastPrompt = '';
    const sbE = $('shareBtn'); if (sbE) sbE.disabled = true;
    el.className = 'prompt-empty';
    el.textContent = t.emptyPrompt;
    $('charCount').textContent = t.charCount(0);
    return;
  }
  if (selected.size >= 2) {
    const tagConflicts = detectTagConflicts();
    if (tagConflicts.length > 0) {
      showTagConflictModal(
        tagConflicts,
        function(conflicts) {
          conflicts.forEach(function(cf) { selected.delete(cf.valB); });
          updateBadges(); updateChips();
          if (activeCatIdx >= 0) openPanel(activeCatIdx);
          _checkTextConflicts(txt);
        },
        function() { _checkTextConflicts(txt); }
      );
      return;
    }
  }
  _checkTextConflicts(txt);
}

function _checkTextConflicts(txt) {
  if (txt && selected.size > 0) {
    const conflicts = detectConflicts(txt);
    if (conflicts.length > 0) {
      showConflictModal(
        conflicts,
        function() {
          conflicts.forEach(function(cf) { selected.delete(cf.val); });
          updateBadges(); updateChips();
          if (activeCatIdx >= 0) openPanel(activeCatIdx);
          _doGenerate();
        },
        function() { _doGenerate(); }
      );
      return;
    }
  }
  _doGenerate();
}

function filterTags() {
  let q = $('search').value.toLowerCase().trim();
  if (!q) { document.querySelectorAll('.tag-btn').forEach(b => b.style.display = ''); return; }
  let foundCi = -1;
  DATA.forEach(function(cat, ci) {
    if (foundCi >= 0) return;
    cat.tags.forEach(function(t) {
      const text = (t[currentLang].label + ' ' + (t[currentLang].sub||'') + ' ' + t.val).toLowerCase();
      if (text.includes(q)) { if (foundCi < 0) foundCi = ci; }
    });
  });
  if (foundCi >= 0) {
    openPanel(foundCi);
    document.querySelectorAll('.tag-btn').forEach(function(btn) {
      const text = btn.textContent.toLowerCase();
      let val = (btn.dataset.val || '').toLowerCase();
      btn.style.display = (!q || text.includes(q) || val.includes(q)) ? '' : 'none';
    });
  }
}

function sharePrompt() {
  if (!lastPrompt) return;
  const t = T[currentLang];
  if (navigator.share) { navigator.share({ title: t.shareTitle || 'Palette AI', text: lastPrompt }).catch(function() {}); return; }
  window.open('https://wa.me/?text=' + encodeURIComponent(lastPrompt), '_blank', 'noopener');
}

function copyPrompt() {
  const t = T[currentLang];
  if (!lastPrompt) return;
  const btn = $('copyBtn'), icon = $('copyIcon'), label = $('copyText');
  function onOk() {
    btn.classList.add('copied'); icon.textContent = '✅'; label.textContent = t.copiedBtn;
    setTimeout(function() { btn.classList.remove('copied'); icon.textContent = '📋'; label.textContent = t.copyBtn; }, 2200);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(lastPrompt).then(onOk).catch(fallback);
  } else { fallback(); }
  function fallback() {
    const ta = document.createElement('textarea');
    ta.value = lastPrompt; ta.style.cssText = 'position:fixed;top:-9999px;opacity:0;';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand('copy'); onOk(); } catch(e) { showToast(currentLang==='he'?'העתקה נכשלה':'Copy failed', true); }
    document.body.removeChild(ta);
  }
}

function showClearModal() {
  const t = T[currentLang]; const isHe = currentLang === 'he';
  const ex = document.getElementById('clearModal'); if (ex) ex.remove();
  const modal = document.createElement('div');
  modal.id = 'clearModal'; modal.className = 'cm-overlay';
  modal.innerHTML = '<div class="cm-box clr-box" dir="' + (isHe ? 'rtl' : 'ltr') + '">' +
    '<div class="cm-title">' + escHtml(t.clearTitle) + '</div><div class="clr-btns">' +
    '<button class="clr-btn clr-all" id="clrAll">' + escHtml(t.clearAll) + '</button>' +
    '<button class="clr-btn" id="clrText">' + escHtml(t.clearText) + '</button>' +
    '<button class="clr-btn" id="clrTags">' + escHtml(t.clearTags) + '</button>' +
    '<button class="clr-btn" id="clrPrompt">' + escHtml(t.clearPrompt) + '</button>' +
    '<button class="clr-btn clr-cancel" id="clrCancel">' + escHtml(t.clearCancel) + '</button></div></div>';
  document.body.appendChild(modal);
  document.getElementById('clrAll').onclick = function() {
    modal.remove(); $("userInput").value = ""; selected.clear(); currentAR = ""; lastPrompt = "";
    document.querySelectorAll(".fmt-btn").forEach(function(b) { b.classList.remove("active"); });
    updateBadges(); updateChips();
    if (activeCatIdx >= 0) openPanel(activeCatIdx);
    const el = $("finalPrompt"); el.className = "prompt-empty"; el.textContent = T[currentLang].emptyPrompt;
    $("charCount").textContent = T[currentLang].charCount(0);
  };
  document.getElementById('clrText').onclick = function() {
    modal.remove(); $("userInput").value = "";
    if (selected.size > 0) { generate(); } else { lastPrompt = ""; $("finalPrompt").className = "prompt-empty"; $("finalPrompt").textContent = T[currentLang].emptyPrompt; $("charCount").textContent = T[currentLang].charCount(0); }
  };
  document.getElementById('clrTags').onclick = function() {
    modal.remove(); selected.clear(); currentAR = "";
    document.querySelectorAll(".fmt-btn").forEach(function(b) { b.classList.remove("active"); });
    updateBadges(); updateChips();
    if (activeCatIdx >= 0) openPanel(activeCatIdx);
    const txt2 = $("userInput").value.trim();
    if (txt2) { generate(); } else { lastPrompt = ""; $("finalPrompt").className = "prompt-empty"; $("finalPrompt").textContent = T[currentLang].emptyPrompt; $("charCount").textContent = T[currentLang].charCount(0); }
  };
  document.getElementById('clrPrompt').onclick = function() {
    modal.remove(); lastPrompt = ''; const sbC = $('shareBtn'); if (sbC) sbC.disabled = true;
    const el = $('finalPrompt'); el.className = 'prompt-empty'; el.textContent = T[currentLang].emptyPrompt;
    $('charCount').textContent = T[currentLang].charCount(0);
  };
  document.getElementById('clrCancel').onclick = function() { modal.remove(); };
  modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
}

function clearAll() { showClearModal(); }

function setLang(lang) {
  currentLang = lang;
  const t = T[lang];
  document.documentElement.lang = t.lang;
  document.documentElement.dir = t.dir;
  $('btnHE').classList.toggle('active', lang === 'he');
  $('btnEN').classList.toggle('active', lang === 'en');
  setPlaceholder('userInput', t.placeholder);
  setPlaceholder('search', t.searchPlaceholder);
  setText('headerSubtitle', t.subtitle);
  setText('resultLabel', t.resultLabel);
  setText('copyText', t.copyBtn);
  if (t.shareBtn) setText('shareText', t.shareBtn);
  setText('clearBtn', t.clearBtn);
  let prevActive = activeCatIdx;
  buildCatGrid();
  if (prevActive >= 0) openPanel(prevActive);
  updateChips();
  generate();
  if (typeof T_install !== 'undefined' && T_install[lang]) {
    const ti = T_install[lang];
    setText('installMsg', ti.msg);
    const ib = $('installBtn'); if (ib) ib.textContent = ti.btn;
  }
  if (t.arLabel) setText('arLabel', t.arLabel);
  if (t.histTitle) setText('histTitle', t.histTitle);
  if (t.histClear) setText('histClear', t.histClear);
  if (t.ob1) setText('ob1', t.ob1);
  if (t.ob2) setText('ob2', t.ob2);
  if (t.ob3) setText('ob3', t.ob3);
  if (t.randomBtn)    setText('randomBtnLabel', t.randomBtn);
  if (t.kidsBtnTitle) setText('kidsBtnTitle',   t.kidsBtnTitle);
  if (t.kidsBtnSub)   setText('kidsBtnSub',     t.kidsBtnSub);
  if (t.adultsBtnTitle) setText('adultsBtnTitle', t.adultsBtnTitle);
  if (t.adultsBtnSub)   setText('adultsBtnSub',   t.adultsBtnSub);
  if (t.fmtStory)  setText('fmtStory',  t.fmtStory);
  if (t.fmtSquare) setText('fmtSquare', t.fmtSquare);
  if (t.fmtWide)   setText('fmtWide',   t.fmtWide);
}

const T_install = {
  he: { msg: 'הוסף למסך הבית לגישה מהירה', btn: 'הוסף', ios: 'לחץ על ⬆ ואז "הוסף למסך הבית"' },
  en: { msg: 'Add to home screen for quick access', btn: 'Add', ios: 'Tap ⬆ then "Add to Home Screen"' },
};

let deferredPrompt = null;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isInStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

function initInstall() {
  if (isInStandalone) return;
  function showBanner() {
    const t = T_install[currentLang] || T_install.he;
    setText('installMsg', t.msg);
    const btn = $('installBtn'); if (btn) btn.textContent = t.btn;
    $('installBanner').classList.add('show');
  }
  if (isIOS) {
    setTimeout(() => {
      const t = T_install[currentLang] || T_install.he;
      setText('iosHintText', t.ios);
      $('iosHint').classList.add('show');
      setTimeout(() => $('iosHint').classList.remove('show'), 8000);
    }, 3000);
    return;
  }
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; showBanner(); });
}

function showInstallSuccess() {
  const isHe = currentLang === 'he';
  const ex = document.getElementById('installSuccessModal'); if (ex) ex.remove();
  const modal = document.createElement('div');
  modal.id = 'installSuccessModal'; modal.className = 'cm-overlay';
  modal.innerHTML = '<div class="cm-box" style="text-align:center" dir="' + (isHe ? 'rtl' : 'ltr') + '">' +
    '<div style="font-size:40px;margin-bottom:12px">🎨</div>' +
    '<div class="cm-title">' + (isHe ? '📲 Palette AI הותקנה!' : '📲 Palette AI Installed!') + '</div>' +
    '<div class="cm-msg" style="margin-top:8px">' + (isHe ? 'מצא/י את 🎨 ברשימת האפליקציות וגרור/י למסך הבית' : 'Find 🎨 in your app drawer and drag it to your home screen') + '</div>' +
    '<button class="clr-btn" id="installSuccessOk" style="margin-top:16px">' + (isHe ? 'הבנתי!' : 'Got it!') + '</button></div>';
  document.body.appendChild(modal);
  document.getElementById('installSuccessOk').addEventListener('click', function() { modal.remove(); });
  modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });
}

function doInstall() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(choice => {
    deferredPrompt = null;
    $('installBanner').classList.remove('show');
    if (choice.outcome === 'accepted' && /Android/i.test(navigator.userAgent)) showInstallSuccess();
  });
}

function dismissInstall() { $('installBanner').classList.remove('show'); deferredPrompt = null; }

const ORDER_PRIORITY = {
  '😊': 1, 'Expressions': 1, '🧍': 2, 'Body Poses': 2,
  '🎭': 3, 'Characters': 3, '🌍': 4, 'Geographic': 4,
  '💇': 5, 'Body &': 5, '🎬': 6, 'Genres': 6,
  '🎨': 7, 'Art Styles': 7, '📸': 8, 'Photography': 8,
  '💡': 9, 'Lighting': 9, '📐': 10, 'Composition': 10,
  '🌆': 11, 'Environments': 11, '🖌': 12, 'Color Palette': 12,
  '⚙': 13, 'Quality': 13, '🔮': 14, 'Aesthetics': 14, '👗': 15, 'Fashion': 15,
};

function getValPriority(val) {
  for (let ci = 0; ci < DATA.length; ci++) {
    for (let ti = 0; ti < DATA[ci].tags.length; ti++) {
      if (DATA[ci].tags[ti].val === val) {
        const title = DATA[ci][currentLang].title;
        for (const key in ORDER_PRIORITY) { if (title.includes(key)) return ORDER_PRIORITY[key]; }
      }
    }
  }
  return 99;
}

const MAX_HIST = 8;
function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function saveHistory(prompt) {
  try {
    const h = JSON.parse(localStorage.getItem('sbp_hist') || '[]');
    if (h[0] && h[0].p === prompt) return;
    const entry = { p: prompt, text: $('userInput').value.trim(), tags: Array.from(selected), ar: currentAR, ts: Date.now() };
    h.unshift(entry); if (h.length > MAX_HIST) h.pop();
    localStorage.setItem('sbp_hist', JSON.stringify(h));
  } catch(e) { console.warn('[SBP]', e); }
}

function loadHistory() { try { return JSON.parse(localStorage.getItem('sbp_hist') || '[]'); } catch(e) { return []; } }

function renderHistory() {
  const el = $('historyList'); if (!el) return;
  const h = loadHistory();
  if (!h.length) { el.innerHTML = '<div class="hist-empty">' + (currentLang==='he' ? 'אין פרומפטים שמורים עדיין' : 'No saved prompts yet') + '</div>'; return; }
  el.innerHTML = h.map((e,i) => {
    const short = escHtml(e.p.length > 70 ? e.p.slice(0,70)+'…' : e.p);
    const time = new Date(e.ts).toLocaleTimeString(currentLang==='he'?'he-IL':'en-US',{hour:'2-digit',minute:'2-digit'});
    return '<div class="hist-item" onclick="loadHist('+i+')">' + '<div class="hist-text">' + short + '</div>' + '<div class="hist-time">' + time + '</div></div>';
  }).join('');
}

function loadHist(idx) {
  const h = loadHistory(); if (!h[idx]) return;
  const entry = h[idx];
  $('userInput').value = entry.text || '';
  selected.clear();
  if (entry.tags && Array.isArray(entry.tags)) entry.tags.forEach(v => selected.add(v));
  currentAR = entry.ar || '';
  document.querySelectorAll('.fmt-btn').forEach(b => b.classList.toggle('active', b.dataset.ar === currentAR));
  updateBadges(); updateChips();
  if (activeCatIdx >= 0) openPanel(activeCatIdx);
  toggleHistPanel(); generate();
}

function toggleHistPanel() {
  const p = $('histPanel'); if (!p) return;
  const opening = !p.classList.contains('open');
  p.classList.toggle('open');
  if (opening) renderHistory();
}

function clearHistory() {
  try { localStorage.removeItem('sbp_hist'); } catch(e) { console.warn('[SBP]', e); }
  renderHistory();
}

function randomizeKids() {
  const inputEl = $('userInput');
  const kidsSubjects = {
    he: ['חתול אסטרונאוט בחלל הכוכבים','דינוזאור ורוד עם כנפי פרפר צבעוניות','ארמון ממתקים וגלידה','גור כלבים עם עטרת נסיך','דרקון חמוד שמנשף בועות סבון','ילדה רוכבת על חד קרן קשת','רובוט קטן שמשחק בגינה','ספינת חלל עם חיות חמודות'],
    en: ['Astronaut cat in colorful space','Pink dinosaur with rainbow butterfly wings','Castle made of candy and ice cream','Puppy wearing a prince crown','Cute dragon blowing soap bubbles','Girl riding a rainbow unicorn','Small robot playing in the garden','Spaceship with cute animals inside']
  };
  const langKey = currentLang === 'en' ? 'en' : 'he';
  const list = kidsSubjects[langKey];
  inputEl.value = list[Math.floor(Math.random() * list.length)];
  const kidsTags = [
    'anime style, manga art, studio ghibli inspired',
    'Disney animation style, Disney character art, expressive eyes, smooth clean lines, magical Disney aesthetic',
    'pixel art, 16-bit, retro game style',
    'watercolor painting, soft edges, flowing colors',
    'comic book art, bold outlines, halftone',
    'golden hour, warm sunlight, long shadows',
    'smiling, warm genuine smile, happy expression, joyful face',
    'warm color palette, amber tones, orange and red hues, warm cozy atmosphere',
    'spring blossom season, cherry trees blooming, soft pink petals, fresh green growth, renewal and hope',
    'detailed pet portrait, expressive animal eyes, soft fur texture, natural lighting, intimate animal photography',
    'mythical fantasy creature, dragon or phoenix, ethereal magical being, detailed scales or feathers',
  ];
  selected.clear();
  const shuffled = [...kidsTags].sort(() => Math.random() - 0.5);
  const count = 4 + Math.floor(Math.random() * 3);
  shuffled.slice(0, count).forEach(function(v) { selected.add(v); });
  if (activeCatIdx >= 0) openPanel(activeCatIdx);
  updateBadges(); updateChips(); generate(); updateHintVisibility();
  const btn = $('kidsBtn');
  if (btn) {
    const icon = btn.querySelector('.kids-icon');
    if (icon) { icon.style.transition = 'transform 0.3s'; icon.style.transform = 'scale(1.4) rotate(20deg)'; setTimeout(function() { icon.style.transform = 'scale(1) rotate(0)'; }, 300); }
  }
}

function updateHintVisibility() {
  const inputVal = $('userInput').value.trim();
  const hint = $('randomHint'); if (!hint) return;
  const t = T[currentLang];
  if (inputVal) { hint.style.opacity = '0'; hint.style.visibility = 'hidden'; }
  else { hint.textContent = t.randomHint || 'ריק? נביא לך רעיון ✨'; hint.style.opacity = '0.8'; hint.style.visibility = 'visible'; }
}

function randomize() {
  const inputEl = $('userInput');
  let userInput = inputEl.value.toLowerCase().trim();
  const subjects = {
    he: ['חתול אסטרונאוט בחלל','דרקון גלידה צבעוני','עיר עתידנית מתחת למים','רובוט חמוד שמחבק דובי','טירה קסומה על ענן','מכונית מירוץ על מאדים','גיבור על בצורת אבוקדו','פיל מעופף עם כנפי פרפר'],
    en: ['Astronaut cat in space','Colorful ice cream dragon','Futuristic underwater city','Cute robot hugging a teddy bear','Magical castle on a cloud','Race car on Mars','Avocado superhero','Flying elephant with butterfly wings']
  };
  if (!userInput) {
    const list = subjects[currentLang] || subjects.en;
    inputEl.value = list[Math.floor(Math.random() * list.length)];
    userInput = inputEl.value.toLowerCase();
  }
  selected.clear();
  const allTags = [], smartTags = [];
  DATA.forEach(cat => {
    cat.tags.forEach(tag => {
      const labelHe = tag.he.label.toLowerCase();
      const labelEn = tag.en.label.toLowerCase();
      if (labelHe.includes(userInput) || labelEn.includes(userInput) || userInput.includes(labelHe) || userInput.includes(labelEn)) { smartTags.push(tag.val); }
      else { allTags.push(tag.val); }
    });
  });
  for (let i = allTags.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [allTags[i], allTags[j]] = [allTags[j], allTags[i]]; }
  const count = 4 + Math.floor(Math.random() * 4);
  smartTags.forEach(t => { if (selected.size < count) selected.add(t); });
  for (let i = 0; i < allTags.length && selected.size < count; i++) selected.add(allTags[i]);
  if (activeCatIdx >= 0) openPanel(activeCatIdx);
  updateBadges(); updateChips(); generate(); updateHintVisibility();
  const btn = $('randomBtn');
  if (btn) { btn.style.transform = 'scale(0.95)'; setTimeout(() => btn.style.transform = 'scale(1)', 150); }
}

function initOnboarding() {
  try { if (localStorage.getItem('sbp_ob')) return; } catch(e) { console.warn('[SBP]', e); }
  const el = $('onboarding');
  if (el) setTimeout(() => el.classList.add('show'), 400);
}

function dismissOnboarding() {
  const el = $('onboarding'); if (el) el.classList.remove('show');
  try { localStorage.setItem('sbp_ob', '1'); } catch(e) { console.warn('[SBP]', e); }
}

let currentAR = '';
function setAR(ar) {
  currentAR = currentAR === ar ? '' : ar;
  document.querySelectorAll('.fmt-btn').forEach(b => b.classList.toggle('active', b.dataset.ar === currentAR));
  if (lastPrompt) generate();
}

function showToast(msg, isErr, isDeep) {
  let t = $('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = 'toast show' + (isErr ? ' toast-err' : '') + (isDeep ? ' toast-deep' : '');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), isDeep ? 3500 : 2200);
}

// ── Install Tracker ────────────────────────────────────────────
const TRACKER_URL = 'https://script.google.com/macros/s/AKfycbw4T2BKICMlJLgCGWuEPUpbuMtAyy0qD3zGNpwHVISyvzZnG9dW8i18Becg-QdPWfqm/exec';
const TRACKER_KEY = 'palette_tracked';
const APP_VERSION = '1.0';

function trackInstall() {
  try {
    if (localStorage.getItem(TRACKER_KEY)) return;
    const ua = navigator.userAgent || '';
    let device = 'desktop';
    if (/android/i.test(ua)) device = 'android';
    else if (/iphone|ipad|ipod/i.test(ua)) device = 'ios';
    else if (/mobile/i.test(ua)) device = 'mobile';
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'unknown';
    const params = new URLSearchParams({ lang, device, version: APP_VERSION, ua: ua.slice(0, 200) });
    fetch(TRACKER_URL + '?' + params.toString(), { method: 'GET', mode: 'no-cors' })
      .then(() => { localStorage.setItem(TRACKER_KEY, '1'); console.log('[Palette AI] install tracked'); })
      .catch(err => console.warn('[Palette AI] tracker:', err));
  } catch(e) { console.warn('[Palette AI] tracker error:', e); }
}

// ── PayBox Donation ───────────────────────────────────────
const PAYBOX_URL = 'https://links.payboxapp.com/hbbbRHMn91b';
const PAYPAL_URL = 'https://paypal.me/yourname';

function doPayBox() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = (navigator.language || '').toLowerCase();
    const isIL = tz.includes('Jerusalem') || tz.includes('Israel') ||
                 lang.startsWith('he') || lang.startsWith('iw');
    const url = isIL ? PAYBOX_URL : PAYPAL_URL;
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch(e) {
    window.open(PAYBOX_URL, '_blank', 'noopener,noreferrer');
  }
}
function startApp() {
  initInstall();
  trackInstall();
  initOnboarding();
  try { buildCatGrid(); } catch(e) { console.error('[SBP] buildCatGrid:', e); setTimeout(buildCatGrid, 100); }
  try { generate(); } catch(e) { console.warn('[SBP]', e); }
  const t = T[currentLang];
  setPlaceholder('userInput', t.placeholder);
  setPlaceholder('search', t.searchPlaceholder);
  setText('charCount', t.charCount(0));
  setText('headerSubtitle', t.subtitle);
  setText('resultLabel', t.resultLabel);
  setText('copyText', t.copyBtn);
  if (t.shareBtn) setText('shareText', t.shareBtn);
  setText('clearBtn', t.clearBtn);
  setText('arLabel', t.arLabel);
  setText('histTitle', t.histTitle);
  setText('histClear', t.histClear);
  setText('ob1', t.ob1);
  setText('ob2', t.ob2);
  setText('ob3', t.ob3);
  if (t.fmtStory)  setText('fmtStory',  t.fmtStory);
  if (t.fmtSquare) setText('fmtSquare', t.fmtSquare);
  if (t.fmtWide)   setText('fmtWide',   t.fmtWide);
  $('userInput').addEventListener('input', updateHintVisibility);
  updateHintVisibility();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/palette-ai/sw.js', { scope: '/palette-ai/' }).catch(function() {});
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', startApp); }
else { startApp(); }
