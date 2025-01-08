import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// type FAQItem = {
//   question: string;
//   answer: string;
// };

// type FAQProps = {
//   title: string;
//   faqs: FAQItem[];
// };

const faqs = [
  {
    question: "What is the size of a tennis court?",
    answer:
      "A standard tennis court is 78 feet long and 27 feet wide for singles, and 36 feet wide for doubles.",
  },
  {
    question: "What are the basic rules of tennis?",
    answer:
      "Players must hit the ball over the net and into the opponent's court. A point is scored when the opponent cannot return the ball or hits it out of bounds.",
  },
  {
    question: "What equipment is needed to play tennis?",
    answer:
      "Basic equipment includes a tennis racket, tennis balls, and proper tennis shoes. A net is also required for a proper game.",
  },
  {
    question: "What are the different surfaces for tennis courts?",
    answer:
      "Tennis courts can be made of grass, clay, hard court (concrete or asphalt), or artificial turf.",
  },
  {
    question: "How is scoring done in tennis?",
    answer:
      "Tennis uses a unique scoring system: 15, 30, 40, and game. If the score is tied at 40, it's called deuce, and a player must win two consecutive points to win the game.",
  },
];

// const FAQ: React.FC<FAQProps> = () => {
const FAQ = () => {
  const title = "FAQs";
  return (
    <div className="pt-2">
      <h1 className="text-lg font-semibold">{title}</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index + 1}`}
            className="border-none"
          >
            <AccordionTrigger className="!py-2">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
