import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';

const faqs = [
  {
    question: "How does AI Chef Mate work?",
    answer: "AI Chef Mate uses image recognition to identify ingredients and suggests recipes based on them."
  },
  {
    question: "Can I customize the recipes?",
    answer: "Absolutely! You can adjust the ingredients and quantities to suit your taste and dietary preferences."
  },
  {
    question: "How accurate is the image recognition?",
    answer: "Our AI uses advanced image recognition technology to accurately identify ingredients and suggest relevant recipes."
  }
];

const FaqSection = () => {
  return (
    <section className="w-full max-w-md p-2 mx-auto">
      {faqs.map((faq, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <>
              <DisclosureButton 
              className="flex justify-between w-full px-8 py-4 text-m font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{faq.question}</span>
                <ChevronUpIcon
                  className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}
                />
              </DisclosureButton>
              <DisclosurePanel className="px-8 pt-8 pb-4 text-m text-gray-500">
                {faq.answer}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </section>
  );
};

export default FaqSection;
