import "@/app/globals.css";

import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen text-black font-serif">
      <div className="max-w-5xl mx-auto px-10 pt-6">
        {/* ── Header ── */}
        
        <div className="leading-relaxed">
          <h1 className="text-3xl">Curriculum Vitae</h1>
          <p className="font-sans text-s"> Undergraduate researcher at McGill University (BSc Computer Science & Biology), specializing in computational genomics and bioinformatics. 
          Currently conducting research at the RI-MUHC on facets and pipelines of ctDNA. Oriented toward graduate study 
          in computational biology, with a focus on human clinical applications.</p>
          
        </div>

        {/* ── Body ── */}
        <div className="space-y-0">

          <Section label="Education">
            <Entry
              title="Faculty of Science, McGill University"
              location="Montréal, Canada"
              role="BSc. Computer Science & Biology"
              dates="2024 – 2027 (expected)"
              bullets={[
                "Advisors: Paul Olioff, Nancy Nelson & Mioara Morisca",
                "Specific focus on genomics & bioengineering applications.",
              ]}
            />
            <Entry
              title="IB Section, King's Interhigh"
              location="London, United Kingdom"
              role="International Baccalaureate"
              dates="2022 – 2024"
              bullets={[
                "HL: Physics, Chemistry, Mathematics Analysis and Approaches",
                "SL: Business Management, English Language & Literature, French ab initio",
              ]}
            />
            <Entry
              title="Center for Talented Youth, Johns Hopkins University"
              location="Baltimore, United States"
              role="Individual courses in AP Biology and AP Computer Science A"
              dates="2022 – 2023"
              bullets={[
                "Course taken covering necessary knowledge of the AP Computer Science A curriculum, with the final AP exam not taken.",
                "Course taken covering necessary knowledge of the AP Biology curriculum, with the final AP exam not taken.",
              ]}
            />
            <Entry
              title="St. Theresa's School"
              location="Mangalore, India"
              role="Indian Certificate of Secondary Education"
              dates="2018 – 2022"
              bullets={[
                "GPA: 4.0 (97.4%), 4/150",
                "Subjects: Mathematics, Computer Science, Physics, Chemistry, Biology, History and Civics, Geography, English (1st Language), Kannada (2nd Language)",
              ]}
            />
          </Section>

          <Section label="Experience">
            <Entry
              title="Burnier Lab, RI-MUHC"
              location="Montréal, Canada"
              role="Summer Student - Bioinformatician"
              dates="May 2026 – Present"
              bullets={[
                "Conducting an guided project in ctDNA pipeline streamlining as a summer student under guidance of senior bioinformatics staff."
              ]}
            />

            <Entry
              title="McGill Biology Student Union"
              location="Montréal, Canada"
              role="Vice President Academic"
              dates="May 2025 – Present"
              bullets={[
                "Monitor and advocate for student interests in accordance with University policy.",
                "Run events related to augmentation of the academic interest of students, such as research or specialized courses.",
                "Represent student interests on the Biology Department Academic Committee.",
                "Represent, more widely, student interests of the Faculty of Science on the Faculty of Science Academic Committee.",
              ]}
            />
            <Entry
              title="Przybyl Lab, RI-MUHC"
              location="Montréal, Canada"
              role="Student Bioinformatician"
              dates="Apr 2025 – Apr 2026"
              bullets={[
                "Conducted an independent project on analysis of accuracy and predictive capacity of methylation-to-copy number variation software.",
                "Assisted in data analysis across laboratory projects.",
                "Independently presented summer research at an internal research day in the form of a poster.",
                "Continuing the current project stipended under a grant on leiomyosarcoma/leiomyoma.",
              ]}
            />
            
            <Entry
              title="Wolfram Mathematica"
              location="Urbana-Champaign, U.S."
              role="Student Ambassador"
              dates="Nov 2022 – Dec 2023"
              bullets={[
                "Developing independent projects in Wolfram Mathematica.",
                "Running school-based information sessions on Wolfram products.",
              ]}
            />
            <Entry
              title="Nexus Aurora"
              location="Remote"
              role="Volunteer Technical Contributor"
              dates="Nov 2020 – Oct 2022"
              bullets={[
                "Worked on the access management section of the project, primarily developing security applications in Python.",
                "Worked in the SEMC section, working on developing logistic software in Python.",
                "Worked eventually as a community manager, sitting on the main governing council.",
                "As an early contributor, also helped in establishing key aspects of the ecosystem.",
              ]}
            />
          </Section>

          <Section label="Volunteering">
            <Entry
              title="SSUNS"
              location="Montréal, Canada"
              role="Vice-Chair – ICJ"
              dates="Mar 2026 – Nov 2026"
              bullets={[
                "Vice-chairing the International Court of Justice conference in a Model UN environment for a highly prominent MUN high-school conference in Canada and North America.",
                "Writing a research guide for delegates to the SSUNS-ICJ as part of a team of four individuals.",
                "Involved in decision making related to the conduct of delegates, feedback, as well as award assignments.",
                "Conducted deep research into the legal reasoning and int'l law behind the case of the Vihear Temple (Cambodia v. Thailand)."
              ]}
            />
            <Entry
              title="Peer Support Center of the SSMU"
              location="Montréal, Canada"
              role="Equity & Accessibility Coordinator"
              dates="May 2025 – Present"
              bullets={[
                "Advocate for increased equity & accessibility in the PSC and the services it offers.",
                "Monitor and implement advances in equity as to better serve the student committee.",
                "Sit on the SSMU EDI Roundtable.",
                "Execute policy on de-escalation and resolve internal conflicts within the service.",
              ]}
            />
            <Entry
              title="McMUN"
              location="Montréal, Canada"
              role="Vice-Chair – ADB"
              dates="Apr 2025 – Jan 2026"
              bullets={[
                "Vice-chairing the Asian Development Bank in a Model UN environment for a highly prominent MUN conference in Canada and North America, ranked second on the circuit.",
                "Writing a research guide for delegates to the ADB as part of a team of four individuals.",
                "Involved in decision making related to the conduct of delegates, feedback, as well as award assignments.",
              ]}
            />
            <Entry
              title="SSUNS"
              location="Montréal, Canada"
              role="Vice-Chair – SIDS"
              dates="Mar 2025 – Nov 2025"
              bullets={[
                "Vice-chairing the Small Islands Developing States conference in a Model UN environment for a highly prominent MUN high-school conference in Canada and North America.",
                "Writing a research guide for delegates to the SSUNS-SIDS as part of a team of four individuals.",
                "Involved in decision making related to the conduct of delegates, feedback, as well as award assignments.",
                "Recognized as the best pre-conference dais at SSUNS.",
              ]}
            />
            <Entry
              title="Eating Disorder Center – SSMU"
              location="Montréal, Canada"
              role="Support Volunteer"
              dates="January 2025 – May 2025"
              bullets={[
                "Undergoing 40+ hours of training in active listening and mental health support.",
                "Providing 1-on-1 listening services for those with disordered eating tendencies.",
                "Providing group support sessions for those with disordered eating tendencies.",
              ]}
            />
            <Entry
              title="McMUN"
              location="Montréal, Canada"
              role="Co-Chair – CSTD"
              dates="Nov 2024 – February 2025"
              bullets={[
                "Co-chairing the CSTD in a Model UN environment for a highly prominent MUN conference in Canada and North America, ranked second on the circuit.",
                "Writing a research guide for delegates to the CSTD as part of a team of four individuals.",
                "Involved in decision making related to the conduct of delegates, feedback, as well as award assignments.",
                "Won the best in-conference Dais award as a part of our efforts.",
              ]}
            />
          </Section>

          <Section label="Research">
            <div className="flex gap-6 w-full text-sm">
              <div className="flex-1 leading-relaxed">
                <p className="font-semibold">
                  1. Benchmarking detection of DNA copy number variation using high-density methylation microarrays
                </p>
                <p className="italic">Eliza Kishan &amp; Joanna Przybyl, RI-MUHC</p>
                <p>Poster: RI-MUHC Summer Student Research Day, 08.2025</p>
                <p>Paper: In Writing.</p>
              </div>
            </div>
          </Section>

          <Section label="Projects">
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold leading-snug">
                  Investigating Bio-mimetic Origami Radiation Shield Design Geometries for Mitigating
                  Transient Soft Errors Induced by Cosmic Rays in Solid-State Storage Devices
                </p>
                <p className="text-gray-500">King&apos;s Interhigh &amp; CERN &nbsp;&nbsp; 2022.12 – 2023.04</p>
              </div>
              <div>
                <p className="font-semibold leading-snug">
                  The Ethics of Competition in Education and Competitive Exams
                </p>
                <p className="text-gray-500">King&apos;s Interhigh &nbsp;&nbsp; 2022.12 – 2023.02</p>
              </div>
            </div>
          </Section>

          <Section label="Presentations & Talks">
            <div className="text-sm">
              <p className="font-semibold leading-snug">
                Investigating Bio-mimetic Origami Radiation Shield Design Geometries for Mitigating
                Transient Soft Errors Induced by Cosmic Rays in Solid-State Storage Devices
              </p>
              <p className="text-gray-500">PhysicsBeyond, YouTube &nbsp;&nbsp; 04.09.2023</p>
            </div>
          </Section>

          <Section label="Awards and Honors">
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>
                CERN Beamline For Schools Nomination,{" "}
                <span className="italic">Conseil Européen pour la Recherche Nucléaire</span>{" "}
                2023.06
              </li>
              <li>
                British Intermediate Olympiad Silver Medal,{" "}
                <span className="italic">UK Biology Competitions</span> 2023.01
              </li>
              <li>
                CCIR Future Scholar w/ Scholarship,{" "}
                <span className="italic">Cambridge Center for International Research</span>, 2022.10
              </li>
            </ul>
          </Section>

          <Section label="Skills">
            <div className="text-sm space-y-1">
              <p>
                <span className="font-semibold">Languages:</span> English, French, Kannada.
              </p>
              <p>
                <span className="font-semibold">Programming:</span> Python, R, Java, C#, Mathematica.
              </p>
              <p>
                <span className="font-semibold">Certifications:</span> Standard First Aid w/ CPR-C (Croix Rouge Canadienne-Québec)
              </p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8 w-full pt-4 pb-4">
      <div className="shrink-0 w-36 text-md font-bold tracking-wide leading-tight pt-0.5 text-right font-sans text-[var(--color-green-dark)]">
        {label}
      </div>
      <div className="flex-1 space-y-4">{children}</div>
    </div>
  );
}

function Entry({
  title,
  location,
  role,
  dates,
  bullets,
}: {
  title: string;
  location: string;
  role: string;
  dates: string;
  bullets: string[];
}) {
  return (
    <div className="text-sm font-sans">
      <div className="flex justify-between items-baseline gap-4">
        <span className="font-bold">{title}</span>
        <span className="text-[var(--color-text-muted)] text-xs shrink-0">{location}</span>
      </div>
      <div className="flex justify-between items-baseline gap-4">
        <span className="italic">{role}</span>
        <span className="text-[var(--color-text-muted)] text-xs shrink-0">{dates}</span>
      </div>
      <ul className="mt-1 space-y-0.5 list-disc list-inside text-gray-800 leading-snug">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}