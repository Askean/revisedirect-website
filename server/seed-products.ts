import { getUncachableStripeClient } from './stripeClient';

interface ProductConfig {
  name: string;
  description: string;
  course: 'igcse' | 'as-level';
  unitNumber: string;
  available: boolean;
}

const PRODUCTS: ProductConfig[] = [
  // IGCSE Physical Education (0413)
  {
    name: 'IGCSE PE Unit 1: Anatomy and Physiology',
    description: 'Complete revision pack including detailed infographics on body systems, skeletal structure, muscular system, and cardiovascular system. Includes exam-style questions with full mark scheme.',
    course: 'igcse',
    unitNumber: '1',
    available: true,
  },
  {
    name: 'IGCSE PE Unit 2: Health, Fitness and Training',
    description: 'Comprehensive coverage of health components, fitness testing, training methods, and principles of training. Includes exam questions and mark scheme.',
    course: 'igcse',
    unitNumber: '2',
    available: false,
  },
  {
    name: 'IGCSE PE Unit 3: Skill Acquisition and Psychology',
    description: 'Covers classification of skills, learning theories, motivation, arousal, and mental preparation. Includes exam-style questions with mark scheme.',
    course: 'igcse',
    unitNumber: '3',
    available: false,
  },
  {
    name: 'IGCSE PE Unit 4: Social, Cultural and Ethical Influences',
    description: 'Explores social factors affecting participation, the role of media, drugs in sport, and ethical considerations. Includes exam questions and mark scheme.',
    course: 'igcse',
    unitNumber: '4',
    available: false,
  },

  // AS Level Sport & Physical Education (8386)
  {
    name: 'AS Level SPE Unit 1: Joints, Movements and Muscles',
    description: 'Detailed coverage of joint types, movement analysis, muscle groups, and their functions during physical activity. Includes exam questions and mark scheme.',
    course: 'as-level',
    unitNumber: '1',
    available: true,
  },
  {
    name: 'AS Level SPE Unit 2: Biomechanics',
    description: 'Comprehensive analysis of motion, forces, levers, and their application to sporting performance. Includes exam-style questions with mark scheme.',
    course: 'as-level',
    unitNumber: '2',
    available: true,
  },
  {
    name: 'AS Level SPE Unit 3: The Cardiovascular System',
    description: 'In-depth coverage of heart anatomy, cardiac cycle, blood flow, and cardiovascular responses to exercise. Includes exam questions and mark scheme.',
    course: 'as-level',
    unitNumber: '3',
    available: true,
  },
  {
    name: 'AS Level SPE Unit 4: The Respiratory System',
    description: 'Covers lung structure, breathing mechanics, gas exchange, and respiratory responses during exercise. Includes exam questions and mark scheme.',
    course: 'as-level',
    unitNumber: '4',
    available: false,
  },
  {
    name: 'AS Level SPE Unit 5: Skill and Ability',
    description: 'Explores types of skills, abilities, classification systems, and skill development. Includes exam-style questions with mark scheme.',
    course: 'as-level',
    unitNumber: '5',
    available: false,
  },
  {
    name: 'AS Level SPE Unit 6: Theories of Learning',
    description: 'Covers learning theories, stages of learning, and factors affecting skill acquisition. Includes exam questions and mark scheme.',
    course: 'as-level',
    unitNumber: '6',
    available: false,
  },
  {
    name: 'AS Level SPE Unit 7: Information Processing',
    description: 'Detailed coverage of information processing models, memory, decision making, and reaction time. Includes exam questions and mark scheme.',
    course: 'as-level',
    unitNumber: '7',
    available: false,
  },
  {
    name: 'AS Level SPE Unit 8: Practice and Learning',
    description: 'Covers types of practice, feedback, guidance, and transfer of learning. Includes exam-style questions with mark scheme.',
    course: 'as-level',
    unitNumber: '8',
    available: false,
  },
  {
    name: 'AS Level SPE Unit 9: Sociocultural Issues',
    description: 'Explores sociocultural factors affecting participation and performance in sport. Includes exam questions and mark scheme.',
    course: 'as-level',
    unitNumber: '9',
    available: false,
  },
  {
    name: 'AS Level SPE Unit 10: Ethics and Deviance',
    description: 'Covers ethical issues in sport, sportsmanship, gamesmanship, and deviance. Includes exam-style questions with mark scheme.',
    course: 'as-level',
    unitNumber: '10',
    available: false,
  },
  {
    name: 'AS Level SPE Unit 11: Commercialisation and the Media',
    description: 'Explores the relationship between sport, media, and commercialisation. Includes exam questions and mark scheme.',
    course: 'as-level',
    unitNumber: '11',
    available: false,
  },
  {
    name: 'AS Level SPE Unit 12: The Use of Technology',
    description: 'Covers the use of technology in sport for performance enhancement, analysis, and officiating. Includes exam questions and mark scheme.',
    course: 'as-level',
    unitNumber: '12',
    available: false,
  },
];

const PRICE_AMOUNT = 699; // $6.99 in cents

async function seedProducts() {
  console.log('Starting product seed...');
  
  const stripe = await getUncachableStripeClient();

  for (const config of PRODUCTS) {
    try {
      // Check if product already exists by searching
      const existingProducts = await stripe.products.search({
        query: `name:'${config.name}'`,
      });

      if (existingProducts.data.length > 0) {
        console.log(`Product already exists: ${config.name}`);
        continue;
      }

      // Create the product
      const product = await stripe.products.create({
        name: config.name,
        description: config.description,
        metadata: {
          course: config.course,
          unitNumber: config.unitNumber,
          available: config.available.toString(),
          type: 'revision-pack',
          youtubeUrl: 'https://www.youtube.com/@ReviseDirect',
          podbeanUrl: 'https://revisedirect.podbean.com',
        },
      });

      console.log(`Created product: ${product.name} (${product.id})`);

      // Create the price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: PRICE_AMOUNT,
        currency: 'usd',
      });

      console.log(`Created price: ${price.id} ($${PRICE_AMOUNT / 100})`);
    } catch (error: any) {
      console.error(`Error creating product ${config.name}:`, error.message);
    }
  }

  console.log('Product seed complete!');
}

seedProducts().catch(console.error);
