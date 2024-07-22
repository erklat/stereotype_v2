import React from "react";
import { Radio, RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const plans = [
  { name: "Startup", ram: "12GB", cpus: "6 CPUs", disk: "256GB SSD disk" },
  { name: "Business", ram: "16GB", cpus: "8 CPUs", disk: "512GB SSD disk" },
  { name: "Enterprise", ram: "32GB", cpus: "12 CPUs", disk: "1TB SSD disk" },
];

// eslint-disable-next-line react/display-name
const RadioComponent = React.forwardRef((props, ref) => {
  console.log(props);
  const { option } = props;
  return (
    <Radio
      ref={ref}
      value={option.value}
      className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
    >
      <div className="flex w-full items-center justify-between">
        <div className="text-sm/6">
          <p className="font-semibold">{option.label}</p>
          {/* <div className="flex gap-2">
                    <div>{plan.ram}</div>
                    <div aria-hidden="true">&middot;</div>
                    <div>{plan.cpus}</div>
                    <div aria-hidden="true">&middot;</div>
                    <div>{plan.disk}</div>
                  </div> */}
        </div>
        {/* <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" /> */}
      </div>
    </Radio>
  );
});

const RadioGroup = ({ options, value, onChange }) => {
  const [selected, setSelected] = useState(plans[0]);

  console.log(value);

  return (
    <div className="w-full px-4 text-slate-700">
      <div className="mx-auto w-full max-w-md">
        <HeadlessRadioGroup
          by="value"
          value={value}
          onChange={onChange}
          aria-label="Server size"
          className="space-y-2"
        >
          {options.map((option) => (
            <RadioComponent key={option.value} option={option} />
          ))}
        </HeadlessRadioGroup>
      </div>
    </div>
  );
};

export default RadioGroup;
