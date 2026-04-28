-- ─── SETTINGS BETA DATA ────────────────────────────────────────────────────────
UPDATE public.settings 
SET 
  name = 'Yassir Mattous',
  bio = 'Also known as "Zombie", I am a cinematic filmmaker and visual storyteller specializing in high-energy atmospheric content. My work explores the thin line between reality and the surreal, capturing moments that resonate with raw emotion.',
  email = 'mattousyasser@gmail.com',
  phone = '0650862005',
  instagram = '@therealzombie_officiel',
  hero_text = 'The Zombie Vision.\nCapturing the raw energy of life.',
  hero_video_url = 'https://vimeo.com/108018156'
WHERE id IS NOT NULL;

-- ─── PROJECTS BETA DATA ────────────────────────────────────────────────────────
DELETE FROM public.projects;

INSERT INTO public.projects (title, slug, description, role, video_url, video_type, thumbnail_url, display_order) VALUES
('Toyota: Who Is Driving?', 'toyota-who-is-driving', 'A poetic exploration of movement and connection, blending breathtaking landscapes with the rhythmic pulse of driving.', 'Director of Photography', 'https://vimeo.com/1056944424', 'vimeo', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1600', 0),
('Mercedes Benz: Valet Guys', 'mercedes-benz-valet-guys', 'A high-octane thrill ride that turns a mundane valet service into a masterclass in precision and speed.', 'Director / Editor', 'https://vimeo.com/527503331', 'vimeo', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1600', 1),
('Lexus: Next Chapter', 'lexus-next-chapter', 'A futuristic vision of elegance and innovation, showcasing the seamless dance between light and metal.', 'Lead Colorist', 'https://vimeo.com/716947353', 'vimeo', 'https://images.unsplash.com/photo-1485291571170-ef4107ce2d0a?auto=format&fit=crop&q=80&w=1600', 2),
('Porsche: The Spirit of 1948', 'porsche-spirit-of-1948', 'A soulful tribute to the heritage of speed, capturing the timeless silhouette of Porsche against golden-hour serenity.', 'Cinematographer', 'https://vimeo.com/274431766', 'vimeo', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600', 3),
('Theodora: Fashion Designa', 'theodora-fashion-designa', 'A surrealist journey through haute couture, where fabric becomes architecture and movement tells a story of identity.', 'Director', 'https://vimeo.com/1090797153', 'vimeo', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1600', 4),
('Vogue: American Fashion', 'vogue-american-fashion', 'A sweeping, high-fashion epic that traces the evolution of style across decades of American culture.', 'Director of Photography', 'https://vimeo.com/601252574', 'vimeo', 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1600', 5),
('Force of Fashion', 'force-of-fashion', 'A visceral explosion of color and movement that captures the raw energy of high-end style.', 'Lead Colorist', 'https://vimeo.com/169007268', 'vimeo', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1600', 6),
('A Fashion Thing', 'a-fashion-thing', 'A playful yet sophisticated exploration of style as a form of performance art.', 'Director', 'https://vimeo.com/514009432', 'vimeo', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1600', 7),
('Severance: Title Sequence', 'severance-title-sequence', 'A hauntingly beautiful title sequence that blending organic forms with sterile, futuristic technology.', 'VFX Supervisor', 'https://vimeo.com/1066526515', 'vimeo', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600', 8),
('Apple: Flock', 'apple-flock', 'An imaginative display of technological synchronization, where devices move with the grace of a living collective.', 'Director of Photography', 'https://vimeo.com/1006144786', 'vimeo', 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1600', 9),
('Apple Music: Stay', 'apple-music-stay', 'A rhythmic celebration of music and technology, pulsing with high-energy visuals and neon landscapes.', 'Director', 'https://vimeo.com/797049856', 'vimeo', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1600', 10),
('Google: 25 Years in Search', 'google-25-years', 'A profound reflection on the human quest for knowledge, woven together through twenty-five years of collective curiosity.', 'Editor', 'https://vimeo.com/893976214', 'vimeo', 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=1600', 11),
('Xinobi: Strides', 'xinobi-strides', 'A kinetic and visually stunning dance between light and shadow, where movement becomes a universal language.', 'Director of Photography', 'https://vimeo.com/1103959085', 'vimeo', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1600', 12),
('Cults: Onions', 'cults-onions', 'A whimsical and stylish journey through a surreal domestic world, blending retro-chic aesthetics with the uncanny.', 'Director', 'https://vimeo.com/1016198273', 'vimeo', 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1600', 13),
('Chris Cohen: Sunever', 'chris-cohen-sunever', 'A gentle and nostalgic exploration of memory and space, using organic textures and soft, natural light.', 'Cinematographer', 'https://vimeo.com/951746102', 'vimeo', 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1600', 14),
('Elsa y Elmar: Sangre', 'elsa-y-elmar-sangre', 'A bold and visceral celebration of identity featuring powerful performances and striking imagery.', 'Director', 'https://vimeo.com/928424990', 'vimeo', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1600', 15),
('A Good Start', 'a-good-start', 'An intimate slice-of-life that finds profound meaning in the smallest moments of human connection.', 'Director of Photography', 'https://vimeo.com/1068555141', 'vimeo', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1600', 16),
('Playing God', 'playing-god', 'A masterfully crafted stop-motion epic that explores the complex relationship between creator and creation.', 'Lead Animator', 'https://vimeo.com/1149031838', 'vimeo', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1600', 17),
('Wild Summon', 'wild-summon', 'A breathtaking cinematic experience that blends the natural world with mythic, larger-than-life imagery.', 'Cinematographer', 'https://vimeo.com/1128647300', 'vimeo', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1600', 18),
('Heroic Dose', 'heroic-dose', 'A mind-bending journey through the subconscious, where reality dissolves into a series of vivid dreamscapes.', 'Director', 'https://vimeo.com/1079554409', 'vimeo', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1600', 19);

-- ─── EXPERIENCE BETA DATA ────────────────────────────────────────────────────────
DELETE FROM public.experience;

INSERT INTO public.experience (company, role, description, location, start_date, end_date, is_current, display_order) VALUES
('Somesuch & Co.', 'Director / Cinematographer', 'Leading high-end commercial campaigns for global brands including Nike, Apple, and Mercedes-Benz. Focusing on narrative-driven visual storytelling.', 'London, UK', '2023-01-01', NULL, true, 0),
('Pulse Films', 'Lead Colorist', 'Specialized in establishing cinematic look-dev for award-winning music videos and feature length documentaries.', 'Los Angeles, CA', '2021-03-15', '2022-12-31', false, 1),
('A24 Creative', 'Junior Director', 'Developed original short-form content and teasers for theatrical releases. Collaborated with world-renowned directors on visual mood boards.', 'New York, NY', '2019-06-01', '2021-03-01', false, 2),
('Vice Media', 'Documentary Editor', 'Edited fast-paced, immersive culture documentaries with a focus on raw, authentic visual language.', 'Brooklyn, NY', '2017-08-20', '2019-05-30', false, 3),
('Freelance Visuals', 'Cinematographer', 'Traveled globally capturing atmospheric landscapes and urban stories for independent labels and boutique brands.', 'Global', '2015-05-01', '2017-08-01', false, 10);
