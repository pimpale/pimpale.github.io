import React from 'react';

import Section from '../components/Section';
import ArticleLayout from '../components/ArticleLayout';
import Figure from '../components/Figure';

import Tex from '@matejmazur/react-katex';

import IsotopesHalfLifeImg from '../assets/neutrino_submarines/Isotopes_and_half-life.svg';
import OscillationU235Img from '../assets/neutrino_submarines/oscillation_u235.png';
import Submarine1Img from '../assets/neutrino_submarines/submarine1.png';
import KamLANDSchematicImg from '../assets/neutrino_submarines/KamLAND_schematic.png';
import OscillationIbdImg from '../assets/neutrino_submarines/oscillation_ibd.png';
import BolometerImg from '../assets/neutrino_submarines/bolometer.png';
import GalanisCoilImg from '../assets/neutrino_submarines/galanis_coil.png';

const NeutrinoSubmarinesPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section id="overview" name="Can Neutrinos Reveal the Positions of Nuclear Submarines?">
      <p>
        Some of the most important military consequences of AI may come from making intellectual labor cheaper.
        As models become better at research, calculation, simulation, engineering, and software development,
        it may become far easier to develop novel technological solutions that previously had been dismissed as too speculative.
        That being said, breakthroughs are not guaranteed.
        There are manufacturing limitations, in addition to the physical laws of nature, that prevent all scientific possibilities from being realized.
        However, cheap intellectual labor seriously expands the number of ideas that can be investigated
        and can reduce the time needed to bring an idea from a proposal to a prototype, and eventually to a useful military product.
      </p>
      <p>
        Modern military systems were designed with assumptions about what kinds of tools the adversary is likely to possess over the working lifetime of the system.
        If AI-assisted research and development accelerates military hardware progress,
        it can render many such systems obsolete by breaking one of the assumptions behind the system's design.
      </p>
      <p>
        Here, we'll focus on the case of nuclear submarines.
        Nuclear powers rely on ballistic-missile submarines because they are widely regarded as survivable against a first strike.
        Submarines travel deep beneath the ocean surface, where they are invisible to satellite imagery, unlike airfields and silos.
        And even if an adversary manages to spot a submarine at a particular location, it is not guaranteed to be there in the future.
        Thus, the adversary can't plan a first strike that involves destroying all nuclear submarines.
        Any submarine that is not destroyed can launch its own missiles at the adversary,
        retaliating against the original strike and preserving mutually assured destruction.
        The above doctrine has informed the US's nuclear strategy.
        The US maintains<Citation source="https://thebulletin.org/premium/2026-03/united-states-nuclear-weapons-2026/" /> around
        800 nuclear warheads that can be launched from missile silos, but 1,895 nuclear warheads that can be launched from nuclear submarines,
        indicating that the US believes its nuclear submarine force is quite survivable.
      </p>
      <p>
        This survivability is almost entirely based on the adversary's uncertainty about the positions of nuclear submarines.
        But submarines are not totally invisible in practice:
        during the 1980s, the US was able to localize Soviet submarines using a network of underwater sonar listening stations,
        and then "hold them at risk" by assigning an attack submarine to closely tail each one
        and destroy it if it looked like it was about to launch a nuclear missile.
        Submarines can already be detected through sonar, turbulence they leave in the water, wakes on the surface, and magnetic fields.
        More speculative techniques may create entirely new detection channels.
      </p>
      <p>
        In this article, though, we'll investigate the possibility of using the antineutrinos emitted by a nuclear submarine's reactor to detect it.
        Neutrinos pass through nearly every form of matter almost unaffected, making them impossible to shield.
        However, that same property makes them extraordinarily difficult to detect.
        Detectors built using traditional techniques would need to be impractically large in order to detect submarines.
        But advances in quantum technology may enable smaller detectors—ones practical to mount on planes, boats, or satellites
        that would actually provide military value.
        If these detectors are made practical, they will significantly diminish the deterrent value of nuclear submarines
        and dramatically alter the balance of power in anti-submarine warfare.
      </p>
      <p>
        This essay investigates the possibility of such a system from first principles.
        We ask whether quantum neutrino detectors can achieve the sensitivity needed for anti-submarine warfare.
        More broadly, it illustrates the kind of neglected technological pathway that becomes increasingly important
        as AI reduces the cost of intellectual labor.
      </p>
    </Section>
    <Section id="prior-work" name="Background: Prior work">
      <p>
        This idea is not completely novel.
        SNIF (Lasserre et al.)<Citation source="https://arxiv.org/abs/1011.3850" /> proposed
        a cargo-ship-sized detector that could be used to detect and localize an unauthorized nuclear reactor from across borders.
        But, as we'll see, detecting a nuclear submarine is a much harder problem.
      </p>
      <p>
        Additionally, we know the US government is aware of this possibility.
        A recently declassified CIA report<Citation source="https://www.cia.gov/readingroom/docs/DOC_0005512850.pdf" /> discussed
        the possibility of neutrino submarine detection in the 1970s.
        More recently, in 2025, DARPA funded research<Citation source="https://physicalsciences.uchicago.edu/news/article/interdisciplinary-team-receives-5-million-darpa-grant-to-develop-qubit-based-neutrino-detector/" /> on
        CEvNS, a detection technique well suited to reactor neutrinos.
      </p>
    </Section>
    <Section id="physics" name="Background: Physics">
      <p>
        <a href="https://en.wikipedia.org/wiki/Neutrino">Neutrinos</a> are extremely light fundamental particles
        that interact with matter only through the weak force and gravity.
        They have an extremely low "<a href="https://en.wikipedia.org/wiki/Cross_section_(physics)">cross-section</a>" for interaction with matter.
        A reactor-energy neutrino could pass through 60 light-years of water
        without interacting once<Citation source="https://www2.ph.ed.ac.uk/~muheim/teaching/np3/lect-neutrino.pdf" />.
        Although they are difficult to detect, they are ubiquitous.
        The Earth's surface has a flux of approximately 66 billion solar neutrinos per square centimeter per second,
        almost all of which will pass through the entire Earth without interacting once.
      </p>
      <p>
        Neutrinos come in three flavors, each of which has a corresponding antiparticle.
        Each of the neutrino flavors corresponds to a charged lepton (an electron, muon, or tau).
        The most important of these for our purposes is the <b>electron antineutrino</b>,
        which is emitted every time a neutron decays into a proton and electron.
        This process is known as <a href="https://en.wikipedia.org/wiki/Beta_decay">beta minus (<Tex math="\beta^-" />) decay</a>.
      </p>
      <p>
        During nuclear fission, heavy isotopes are split apart into lighter ones, releasing energy.
        Since heavy isotopes generally tend to be relatively neutron-rich, and lighter isotopes less so,
        beta decays of fission products are quite common.
        The fission products need to convert many of their neutrons into protons to become stable.
      </p>
      <Figure
        src={IsotopesHalfLifeImg}
        alt="Nuclide Plot"
        source={<a href="https://upload.wikimedia.org/wikipedia/commons/8/80/Isotopes_and_half-life.svg">Wikipedia</a>}
        caption="The X axis counts protons, the Y axis counts neutrons"
      />
      <p>
        Each fission product can undergo beta decay many times before becoming stable.
        It turns out that each fission of a uranium-235 atom yields, on average, about 6.08 beta decays,
        and hence 6.08 electron antineutrinos
        (calculated from data in Périssé et al.<Citation source="https://arxiv.org/pdf/2304.14992v2" />).
      </p>
      <p>
        One bizarre phenomenon observed in neutrinos is that
        they <a href="https://en.wikipedia.org/wiki/Neutrino_oscillation">oscillate</a> between flavors as they propagate.
        This means even though reactors only emit electron antineutrinos,
        detectors will observe that some of the antineutrinos turned into muon or tau antineutrinos.
        While the effect can usually be neglected over short distances,
        but in our case (tens of kilometers and beyond) it can significantly alter detection rates.
      </p>
      <Figure
        src={OscillationU235Img}
        alt="Reactor Neutrino Spectrum Oscillation"
        source="Own work"
      />
    </Section>
    <Section id="submarines" name="Background: Submarines">
      <p>
        The nuclear submarines that carry ballistic missiles for nuclear deterrence purposes
        are known as <b>SSBNs</b> in the literature. We'll use that nomenclature here.
        SSBNs' primary mission is to be "on patrol", traveling to an undisclosed location,
        and standing prepared to retaliate against any potential nuclear attack.
      </p>
      <p>
        When we evaluate neutrino detectors for detecting SSBNs, we do so in the context of anti-submarine warfare (ASW).
        Thus, it is necessary to understand modern ASW techniques in order to develop a useful detector.
        The bulk of ASW today involves <i>finding</i> the submarine.
        The key advantage of the submarine is stealth.
        Destroying the submarine, once its location is known, is not particularly difficult.
      </p>
      <p>
        The following figure illustrates some of the most promising technological mechanisms that could be utilized to detect submarines.
        Many of these were discussed in a recently
        declassified 1972 CIA document<Citation source="https://www.cia.gov/readingroom/docs/DOC_0005512850.pdf" />.
      </p>
      <Figure
        src={Submarine1Img}
        alt="Submarine Detection Methods"
        source="Own Work"
      />
      <p>
        The most important method (both historically and likely still today) is sonar.
        During the Cold War, the US maintained a network of passive sonar listening posts
        known as <a href="https://en.wikipedia.org/wiki/SOSUS">SOSUS</a>,
        allowing them to determine the position of Soviet submarines with great accuracy.
        Passive sonar arrays have less utility than they did during the Cold War
        because improved technology has made submarines much quieter.
      </p>
      <p>
        As a result of submarines' increasing stealth, there has been greater investment
        into <a href="https://irp.fas.org/program/collect/lfa.htm">Low Frequency Active sonar (LFA)</a>.
        This sonar emits low-frequency sound, and listens for the echo using a mile-long towed array.
        Even a totally silent submarine can be identified via this method.
        However, since this form of sonar emits sound, it also broadcasts the location of the searching ship,
        and that the ship is actively searching for submarines.
        The range of this technique is not public, and varies based on local environmental conditions,
        but a reasonable guess would be ~100 km.
      </p>
      <p>
        Moving away from sonar, we can also detect submarines' magnetic fields.
        Submarines are very large metal objects and have a detectable magnetic signature
        at ranges of a few hundred meters with conventional magnetometers.
        However, magnetometers using <a href="https://en.wikipedia.org/wiki/SQUID">SQUIDs (superconducting quantum interference devices)</a> have
        a sensitivity several orders of magnitude better than conventional ones,
        and near-future implementations may go up
        to 6 kilometers<Citation source="https://www.newscientist.com/article/2144721-chinas-quantum-submarine-detector-could-seal-south-china-sea/" />.
        One fundamental limitation of the technology is that magnetic fields decay with
        the <a href="https://en.wikipedia.org/wiki/Orders_of_magnitude_(magnetic_field)">cube of distance</a>,
        faster than the normal inverse square law.
      </p>
      <p>
        If we want to detect submarines from space, we have two options: LiDAR and Synthetic Aperture Radar (SAR).
      </p>
      <p>
        LiDAR relies on the fact that the ocean is somewhat transparent at certain wavelengths.
        Submarines within 200 m of the surface can be detected by timing the light's return:
        it comes back sooner if it bounces off the submarine.
        However, LiDAR cannot be used when cloud cover is present.
      </p>
      <p>
        Synthetic Aperture Radar can be used to detect the wake from the SSBN, regardless of cloud cover and time of day.
        Even traveling slowly hundreds of meters beneath the surface,
        submarines displace enough water to produce a wake that can be detected from the air or space.
      </p>
    </Section>
    <Section id="setting-bounds" name="Setting Bounds">
      <p>
        Cheaper intellectual labor makes it possible to pursue many novel detector designs cheaply,
        but it does not make all of them viable.
        Before investing in any given detector design,
        we must establish the physical and operational bounds that any system must satisfy.
        There are a few basic questions:
      </p>
      <ol>
        <li>Do submarines even emit enough neutrinos to make the entire enterprise worthwhile?</li>
        <li>What are the constraints on detector footprints? How heavy or large can a detector be?</li>
      </ol>
      <h4 className="mt-4">Submarine Antineutrino Flux</h4>
      <p>
        A nuclear submarine's reactor is not quite the same as a civilian power plant's reactor.
        They have different needs and use cases.
      </p>
      <p>
        By far the most relevant for our purposes is power output.
        A typical nuclear power plant
        outputs<Citation source="https://world-nuclear.org/information-library/nuclear-power-reactors/small-modular-reactors/small-modular-reactors" /> about
        1,000 MW of usable power, and emits <Tex math={String.raw`10^{21}\, \bar\nu/\text{s}`} />,
        as calculated by SNIF (Lasserre et al.)<Citation source="https://arxiv.org/abs/1011.3850" />.
      </p>
      <p>
        In contrast, the <a href="https://en.wikipedia.org/wiki/Ohio-class_submarine">Ohio-class submarine</a>,
        a ballistic missile submarine (the exact kind we'd want to detect),
        has a much smaller <a href="https://en.wikipedia.org/wiki/S8G_reactor">nuclear reactor</a>,
        and typically runs at a fraction of max power.
        When we do the math (see Appendix B), it turns out that the Ohio-class submarine
        likely emits <Tex math={String.raw`1.44 \times 10^{18} \, \bar\nu/\text{s}`} />.
        This means our job is a thousand times harder than that of SNIF.
      </p>
      <p>
        However, the raw neutrinos are there.
        The neutrino flux even 1,000 kilometers away from the submarine is 11.5 neutrinos per square centimeter per second.
        By pure neutrino counts, that's more than sufficient to build a detector on.
        However, the challenge is that neutrinos are so weakly interacting
        that it would be impossible to get a single hit in a reasonable time with any non-quantum detector.
      </p>
      <h4 className="mt-4">Maximum Detector Footprints</h4>
      <p>
        Remember that our goal in the end is to make a useful military system.
        Thus, we have to keep in mind the constraints of the end user.
        There are only a couple kinds of places a detector can go, and they have limited size and weight budgets.
        We're not going to think about cost yet.
      </p>
      <ul>
        <li>
          <b>Aircraft:</b> Aircraft are a very important ASW platform.
          Both the <a href="https://en.wikipedia.org/wiki/Lockheed_P-3_Orion">US</a> and <a href="https://en.wikipedia.org/wiki/Tupolev_Tu-142">Russia</a> use
          aircraft as platforms for magnetometers, the current best passive detection method.
          <ul>
            <li>
              <b>Weight:</b> If we adapted a Boeing 747-400, we would have a max takeoff weight of about 397,000 kg (875,000 lb).
              After subtracting the aircraft's empty weight (~179,000 kg) and a fuel load,
              the usable payload available for a detector is roughly 110,000 kg.
            </li>
            <li>
              <b>Footprint:</b> Using all of a Boeing 747's volume, we would have access to the full fuselage
              (~70 m long, 6.5 m in diameter), giving around 700 m³ of internal volume.
            </li>
          </ul>
        </li>
        <li>
          <b>Cargo Ships:</b> For detectors too large or heavy to mount on aircraft, it might be possible to put them on ships.
          The biggest of these are ultra-large container vessels,
          like the <a href="https://en.wikipedia.org/wiki/MSC_Irina">MSC Irina</a> class (~24,000 TEU).
          <ul>
            <li>
              <b>Weight:</b> These ships have a deadweight tonnage of roughly 240,000 tonnes (240,000,000 kg),
              over 2,000x the payload of a Boeing 747.
            </li>
            <li>
              <b>Footprint:</b> Nearly 400 m long and 61 m in beam for some of the largest cargo ships.
            </li>
          </ul>
        </li>
      </ul>
    </Section>
    <Section id="detectors" name="Reactor-Neutrino-Capable Detectors">
      <p>
        Although neutrino interactions are rare, there are quite a few potential channels for detecting them.
        We'll cover all of the proven ones first, and then move to more speculative ones.
      </p>
      <p>
        Note that there are many neutrino detectors designed for extremely high energy neutrinos
        or neutrino types that are not emitted by reactors.
        For brevity, we'll omit these from the comparison.
      </p>
      <p>
        First, we'll discuss some basic principles of neutrino detector design shared amongst all detectors.
      </p>
      <h4 className="mt-4">Background: Neutrino Detectors</h4>
      <p>
        All neutrino detectors (both traditional and more speculative ones) contain two core elements:
      </p>
      <ol>
        <li>
          The <b>fiducial volume</b>: the portion of the detector filled with a medium
          that actually participates in interacting with the neutrino.
          In doing so, it generates a signal: a flash of light, a gamma ray,
          or a <a href="https://en.wikipedia.org/wiki/Phonon">phonon</a>.
        </li>
        <li>
          The <b>detector elements</b>: these are the parts of the apparatus that read the signal
          produced by the interaction with the medium in the fiducial volume.
          These include things like <a href="https://en.wikipedia.org/wiki/Phototube">phototubes</a> to detect flashes of light,
          or <a href="https://en.wikipedia.org/wiki/Transition-edge_sensor">transition-edge sensors</a> for phonons.
        </li>
      </ol>
      <p>
        Depending on the type of detector, either the detecting medium or the detector elements
        can be the more costly and technically challenging component.
        Some designs focus on maximizing interaction volume;
        others focus on preparing a substrate that is unusually interactive.
      </p>
    </Section>
    <Section id="ibd" name="Inverse Beta Decay">
      <p>
        <b>Inverse beta decay (IBD)</b> is by far the most successful type of reactor neutrino detector.
        It relies on the following interaction:
      </p>
      <Tex block math={String.raw`\bar\nu_e + p \to n + e^+`} />
      <p>
        The incoming neutrino must have a minimum energy, about 1.806 MeV,
        since it needs to provide the energy to convert the light proton into a heavier neutron,
        as well as create a positron.
        Although only about 30% of reactor neutrinos have sufficient energy,
        IBD is still the highest-cross-section channel that's easy to measure.
      </p>
      <Figure
        src={KamLANDSchematicImg}
        alt="KamLAND"
        source={<a href="https://commons.wikimedia.org/wiki/File:KamLAND_schematic.png">https://commons.wikimedia.org/wiki/File:KamLAND_schematic.png</a>}
        caption="Diagram of the KamLAND Detector, a typical reactor neutrino detector"
      />
      <h4 className="mt-4">Cross Section</h4>
      <p>
        We'll consider two different detection media: densified methane, and linear alkylbenzene (LAB).
        Densified methane is a good fit for satellites and aircraft, due to its high gravimetric hydrogen density.
        However, it requires cryogenic cooling that is difficult to provide at scale.
        LAB is a better fit for ships and stationary detectors
        (due to its reasonably high volumetric density and stability at room temperature).
        See Appendices C, E, and F for a detailed calculation of the cross sections.
      </p>
      <ul>
        <li>
          <b>Boeing 747-400F (densified methane):</b>
          <ul>
            <li><Tex math={String.raw`\sigma_\text{IBD} \approx 1.76 \times 10^{-12}`} /> cm²</li>
          </ul>
        </li>
        <li>
          <b>VLCC supertanker (LAB):</b>
          <ul>
            <li><Tex math={String.raw`\sigma_\text{IBD} \approx 2.2 \times 10^{-9}`} /> cm²</li>
          </ul>
        </li>
      </ul>
      <p>
        Note that these cross sections are upper bounds.
        Due to neutrino oscillation, at larger distances, the proportion of electron neutrinos drops.
        Thus, the effective cross section will vary depending on the distance from the reactor:
      </p>
      <Figure
        src={OscillationIbdImg}
        alt="Oscillation suppression: IBD"
        source="own work"
      />
      <p>
        At close ranges (less than 10 km), the oscillation suppression is close to 1,
        meaning the cross section is close to its ideal value in a world without neutrino oscillation.
        However, at longer ranges, it varies nonlinearly and can drop to around 30% of its ideal value.
      </p>
      <p>
        Now, let's evaluate our detectors at a distance of 5 km,
        around the limits of what near-future SQUID magnetometers can measure.
        The flux is <Tex math={String.raw`\approx 4.58 \times 10^{5}\ \bar\nu\,\text{cm}^{-2}\,\text{s}^{-1}`} />,
        working out to a detection rate of:
      </p>
      <ul>
        <li>
          <b>Boeing 747-400F (5 km):</b> <Tex math={String.raw`\approx 8.1 \times 10^{-7}`} /> events/s <Tex math="\approx" /> 1 event every ~14 days
        </li>
        <li>
          <b>VLCC supertanker (5 km):</b> <Tex math={String.raw`\approx 1.0 \times 10^{-3}`} /> events/s <Tex math="\approx" /> 3.6 events/hour (<Tex math="\approx" /> 87 events/day)
        </li>
      </ul>
      <p>
        Based on this, we can already draw some conclusions.
        IBD is totally infeasible for an airborne detector.
        There simply isn't enough signal to easily localize a submarine,
        or even to tail one that has already been detected.
      </p>
      <p>
        For the tanker, 3.6 events per hour is borderline viable,
        but any further increases in distance would likely make it useless.
        The practical prospects are quite poor compared to existing sensors.
        Current magnetometers are plane-mountable, meaning that they can cover a lot more area in one day.
        Our system does have more range than a magnetometer, but it is dominated by active sonar for long-range detection.
      </p>
    </Section>
    <Section id="cevns" name="Coherent Elastic Neutrino-Nucleus Scattering (CEvNS)">
      <p>
        CEvNS involves the neutrino coherently interacting with the entire nucleus as a whole,
        and bouncing off, without producing any new particles:
      </p>
      <Tex block math={String.raw`\nu + A \to \nu + A`} />
      <p>
        It's a <b>coherent</b> interaction: quantum effects boost its cross section compared to what one would naively expect
        by summing together the chances of the neutrino interacting with any individual proton or neutron in the nucleus.
        In general, coherent interactions have a cross section proportional to <Tex math="N^2" />,
        where <Tex math="N" /> is the number of particles participating coherently.
      </p>
      <p>
        The challenge with CEvNS is detecting the interaction.
        The only visible sign that an interaction happened is the recoil energy delivered to the nucleus, typically under 1 keV.
        This is relatively little energy compared to the energy of the neutrino.
        Detector mechanisms typically trade off between using a high-mass nucleus
        (which gets more coherent enhancement, but less recoil)
        and using a lower-threshold detection mechanism that is more sensitive to small recoils.
        See Appendices H and I for cross section calculations.
      </p>
      <table className="table" style={{ maxWidth: "45rem", margin: "auto" }}>
        <thead>
          <tr>
            <th>Detector</th>
            <th>Target</th>
            <th>Recoil threshold</th>
            <th><Tex math={String.raw`\langle \sigma \rangle`} /> (<Tex math={String.raw`\text{cm}^2/\text{kg}`} />)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cryogenic phonon bolometer</td>
            <td>Ge</td>
            <td>~50 eV</td>
            <td><Tex math={String.raw`1.0 \times 10^{-16}`} /></td>
          </tr>
          <tr>
            <td>High-pressure gas TPC</td>
            <td>Kr</td>
            <td>~150 eV</td>
            <td><Tex math={String.raw`5.3 \times 10^{-17}`} /></td>
          </tr>
          <tr>
            <td>Silicon CCD</td>
            <td>Si</td>
            <td>~50 eV</td>
            <td><Tex math={String.raw`4.2 \times 10^{-17}`} /></td>
          </tr>
          <tr>
            <td>HPGe ionization</td>
            <td>Ge</td>
            <td>~1 keV</td>
            <td><Tex math={String.raw`6.8 \times 10^{-19}`} /></td>
          </tr>
        </tbody>
      </table>
      <p>
        For reference purposes, we'll also note a few more rows:
      </p>
      <table className="table" style={{ maxWidth: "45rem", margin: "auto" }}>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Target</th>
            <th><Tex math={String.raw`\langle \sigma \rangle`} /> (<Tex math={String.raw`\text{cm}^2/\text{kg}`} />)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CEvNS Theoretical Max</td>
            <td>Pure Lead</td>
            <td><Tex math={String.raw`6.2 \times 10^{-16}`} /></td>
          </tr>
          <tr>
            <td>IBD Theoretical Max</td>
            <td>Pure Hydrogen</td>
            <td><Tex math={String.raw`6.2 \times 10^{-17}`} /></td>
          </tr>
          <tr>
            <td>IBD Practical Max</td>
            <td>Methane</td>
            <td><Tex math={String.raw`1.56 \times 10^{-17}`} /></td>
          </tr>
        </tbody>
      </table>
      <p>
        Like before, the main quantity we care about is cross section per kilogram of detector mass.
        And based on this, CEvNS dominates IBD.
        All of the detector mechanisms considered beat IBD.
        Cryogenic phonon bolometers even beat IBD's theoretical maximum of using pure hydrogen.
        As an added bonus, since CEvNS is flavor-insensitive,
        it doesn't suffer from cross-section suppression due to oscillation.
      </p>
      <Figure
        src={BolometerImg}
        alt="Bolometer"
        source={<a href="https://indico.ihep.ac.cn/event/9831/contributions/112193/attachments/60182/69378/bolometer_based_CEvNs_research.pdf">https://indico.ihep.ac.cn/event/9831/contributions/112193/attachments/60182/69378/bolometer_based_CEvNs_research.pdf</a>}
        caption="An illustration of how a cryogenic bolometer works."
      />
      <p>
        Note that scaling up cryogenic phonon bolometers has precedent.
        The current state of the art is <a href="https://en.wikipedia.org/wiki/CUORE">CUORE</a>,
        which keeps about 740 kg of crystals at around 10 millikelvin,
        and it's plausible that current methods would simply work if scaled up.
        If we did so, we would find:
      </p>
      <ul>
        <li>
          <b>Boeing 747-400F (Cryogenic Phonon Bolometer):</b>
          <ul>
            <li><Tex math={String.raw`\sigma_\text{CEvNS} \approx 1.13 \times 10^{-11}`} /> cm² (6.4x IBD)</li>
          </ul>
        </li>
        <li>
          <b>VLCC supertanker (Cryogenic Phonon Bolometer):</b>
          <ul>
            <li><Tex math={String.raw`\sigma_\text{CEvNS} \approx 3.0 \times 10^{-8}`} /> cm² (14x IBD)</li>
          </ul>
        </li>
      </ul>
      <p>
        Using the same 5 km flux figure as in the IBD section above:
      </p>
      <ul>
        <li>
          <b>Boeing 747-400F (5 km):</b> <Tex math={String.raw`\approx 5.2 \times 10^{-6}`} /> events/s <Tex math="\approx" /> 1 event every ~2.2 days (~6.4x the IBD rate)
        </li>
        <li>
          <b>VLCC supertanker (5 km):</b> <Tex math={String.raw`\approx 1.37 \times 10^{-2}`} /> events/s <Tex math="\approx" /> 49 events/hour (<Tex math="\approx" /> 1,190 events/day) (~14x the IBD rate)
        </li>
      </ul>
      <p>
        Unfortunately, aircraft-based detectors are still not viable.
        However, the tanker platform has substantial signal.
        Let's see if it holds up at 50 km:
      </p>
      <ul>
        <li>
          <b>VLCC supertanker (50 km):</b> <Tex math={String.raw`\approx 1.37 \times 10^{-4}`} /> events/s <Tex math="\approx" /> 0.49 events/hour
        </li>
      </ul>
      <p>
        Because CEvNS still has some signal at 50 km,
        it actually starts to become a practical supplement to magnetometers at long distances.
        No magnetometer could detect a signal at 50 kilometers,
        as the field strength decays much faster than the neutrino signal does.
        However, sonar systems still likely beat it.
      </p>
    </Section>
    <Section id="coherent-across-atoms" name="Coherent Interactions across Atoms">
      <p>
        We now move from single-atom interactions to coherent interactions that involve many atoms.
        CEvNS only makes limited use of coherent enhancement because there is a limit to the number of nucleons in a nucleus
        before the nucleus becomes radioactive.
        The goal of these approaches is to enable <Tex math="N^2" /> enhancement across atoms.
        If done well, a neutrino could coherently interact with thousands to even millions of individual particles.
        In theory, this could boost detection rates by many orders of magnitude.
        But there are a few hard problems that all such approaches must overcome:
      </p>
      <ol>
        <li>
          In general, the atoms must be maintained in a precise quantum state.
          This often requires deep cryogenic refrigeration.
        </li>
        <li>
          A recurring question is how to read out whether an interaction has happened.
          The amount of energy that can be deposited while maintaining coherence is often limited.
        </li>
      </ol>
      <p>
        To date, coherent weak interactions across atoms have never been demonstrated in practice,
        and the approaches we'll discuss, while not requiring dramatic far-future technology,
        will require substantial theory and engineering effort to make practical.
        However, these are also the kinds of bottlenecks for which AI-assisted research and development is highly effective.
        Previously, developing such a technique would require expertise spread across several specialized fields:
        condensed matter physics, quantum sensing, cryogenics, and nuclear engineering.
        This kind of intellectual labor is something AI has significant comparative advantage on.
      </p>
      <p>
        We'll discuss two approaches:
      </p>
      <ol>
        <li>Superradiant Spin Transition Detector</li>
        <li>Bose-Einstein Condensate Superabsorption</li>
      </ol>
    </Section>
    <Section id="superradiant-spin-transition" name="Superradiant Spin Transition Detector">
      <p>
        Of the two mechanisms we'll discuss, a superradiant spin transition detector
        is the more scientifically well-understood and broadly accepted one.
        There have been several peer-reviewed papers on the topic; see Appendix J for an overview.
      </p>
      <p>
        The detector uses two principles: neutrino spin transitions, and a phenomenon called <b>superradiance</b>.
        The first principle is the spin equivalent of CEvNS.
        Every atom has a spin pointing in some direction,
        and a neutrino can interact with an atom and flip its spin:
      </p>
      <Tex block math={String.raw`\nu + A_{\uparrow} \to \nu + A_{\downarrow}`} />
      <p>
        On its own, this is unhelpful, since it's a relatively rare interaction.
        This is where the second principle, superradiance, comes in.
        If we can prepare a set of atoms such that when a neutrino interacts with one of the atoms,
        we can't tell which atom was flipped even in principle,
        we can treat the entire set of atoms as a single quantum system
        (a <a href="https://en.wikipedia.org/wiki/Dicke_state">Dicke ladder</a> with <Tex math="N" /> levels).
        The flip isn't located in any particular atom; it is shared by the entire ensemble at once.
        Because each of the <Tex math="N" /> atoms participates in the event,
        the interaction is dramatically more likely than it would be for any single atom.
        When half the atoms are spin up and the other half spin down (halfway up the Dicke ladder),
        this gives us an <Tex math="N^2" /> enhancement.
      </p>
      <Figure
        src={GalanisCoilImg}
        alt="Galanis et al. (2025) Figure 1"
        source={<>Figure 1, <a href="https://arxiv.org/abs/2508.20520">https://arxiv.org/abs/2508.20520</a></>}
        caption={<>
          Abstract illustration of the detector setup in Galanis et al (2025).
          Helium-3 gas is contained in the blue sphere, which is surrounded by a solenoid.
          Both the solenoid and the gas sample are embedded in an external magnetic field <Tex math="B_{ext}" />.
        </>}
      />
      <p>
        The main challenge of the system is measuring the change.
        Each spin flip changes the state of the ensemble only slightly.
        One recent paper (Galanis et al (2025)<Citation source="https://arxiv.org/abs/2508.20520" />) detects this
        by measuring how fast the entire ensemble decoheres — that is, how much faster the quantum state decays.
        The difficulty is in separating this neutrino-induced decoherence
        from the mundane decoherence caused by known technical limitations.
        In that paper's design, the actual fiducial volume is a gas of Helium-3 atoms
        (an atom with favorable spin characteristics),
        which we spin up into the prepared "start" state using standard nuclear magnetic resonance techniques.
        The state of the helium is managed by a set of magnets installed around the volume.
        The limiting factor is not the mass of the fiducial volume (which is low since we're using helium),
        but the mass of the supporting magnets and other equipment.
      </p>
      <p>
        One of the major downsides of this system for reactor-energy neutrinos
        is that there is a limit to how much momentum can be exchanged with an atom during an interaction.
        This means high-energy neutrinos can't change direction during an interaction,
        and only interact coherently with a narrow cone of atoms.
        This cone grows narrower the higher the energy of the neutrino.
      </p>
      <p>
        We do the calculations in Appendix L.
        It turns out that a VLCC carrying five 20-meter-radius sensing spheres has quite substantial signal:
      </p>
      <ul>
        <li>
          <b>VLCC supertanker (5 km):</b> <Tex math="\approx" /> 1,070 events/hour (<Tex math="\approx" /> 25,600 events/day) (~22x the CEvNS rate)
        </li>
        <li>
          <b>VLCC supertanker (50 km):</b> <Tex math="\approx" /> 10.7 events/hour (<Tex math="\approx" /> 256 events/day) (~22x the CEvNS rate)
        </li>
        <li>
          <b>VLCC supertanker (100 km):</b> <Tex math="\approx" /> 2.7 events/hour (<Tex math="\approx" /> 64 events/day)
        </li>
      </ul>
      <p>
        Unlike CEvNS, the signal remains usable even at 100 km.
        This is on par with active sonar, with the further advantage of being totally passive.
      </p>
    </Section>
    <Section id="bec-superabsorption" name="Bose-Einstein Condensate Superabsorption">
      <p>
        This method is more speculative than the previous one.
        It's based on a paper proposing to build a "neutrino laser"
        (Jones &amp; Formaggio (2024)<Citation source="https://arxiv.org/abs/2412.11765" />).
        They calculate that a Bose-Einstein condensate of the radioactive
        isotope <Tex math={String.raw`^{83}\text{Rb}`} /> could emit neutrinos superradiantly,
        shortening its effective half-life from 86 days to minutes
        in a ~<Tex math="10^6" />-atom condensate.
      </p>
      <p>
        The way this works is just like the spin-transition detector described above:
        since we can't tell which atom decayed, even in theory, we can treat the entire system as one.
        Here, each step of the Dicke ladder corresponds to whether an atom is still rubidium, or has decayed.
        As before, the system absorbs at a rate proportional to <Tex math="N^2" /> when
        we're exactly halfway up the ladder: half of the atoms have decayed, and the other half haven't.
        However, we get a much smaller boost when we're not near the center of the ladder
        (few atoms have decayed, or almost all of them have decayed).
        This means that the process is slow to start, but proceeds rapidly due to self-reinforcement.
      </p>
      <p>
        The paper discusses the prospect of running the process in reverse to create a "superabsorber",
        which they suggest could be used to detect the cosmic neutrino background.
        They note the idea faces difficulties because the first few neutrino captures are not boosted superradiantly.
      </p>
      <p>
        However, because we're interested in higher-energy neutrinos, we are freed from many of their constraints.
        Notably, we can just use hydrogen and rely on inverse beta decay instead of exotic isotopes.
        We can work around the difficulty of starting the process
        by using a larger Bose-Einstein condensate (which has a higher neutrino cross section at the start)
        and "pre-loading" the process by exposing the condensate to a neutrino source.
      </p>
      <p>
        This process differs from the spin-transition one in ways both positive and negative for our goals.
        First, because it emits a neutron and positron, we are immediately able to detect when an event has occurred.
        Furthermore, a neutrino doesn't have the same coherence requirements it did in the spin-flip case.
        Even a very high-energy neutrino can interact coherently with the entire condensate (no cone restriction),
        since the atoms all occupy the same quantum position.
      </p>
      <p>
        The downside is that to be practical, it requires a Bose-Einstein condensate
        ten billion times larger than anything anyone has ever made.
        The current world record for Bose-Einstein condensate size is <Tex math="10^9" /> atoms.
        This may sound ridiculous, but <Tex math="10^{19}" /> atoms would only weigh 17 micrograms,
        and fit within a 100-liter magnetic trap (small enough to fit on a plane or satellite).
        It's likely achievable with near-future technology.
      </p>
      <p>
        If we do the math, we find that each individual <Tex math="10^{19}" />-atom condensate,
        held at the midpoint of its ladder, has an effective cross section
        of <Tex math={String.raw`2.6 \times 10^{-6}`} /> cm² — nearly ninety times
        the CEvNS cross section of an entire supertanker, from 17 micrograms of gas.
        We do the calculations in Appendix M. The resulting rates:
      </p>
      <ul>
        <li>
          <b><Tex math="10^{19}" />-atom condensate (5 km):</b> <Tex math="\approx" /> 4,300 events/hour
        </li>
        <li>
          <b><Tex math="10^{19}" />-atom condensate (50 km):</b> <Tex math="\approx" /> 43 events/hour
        </li>
        <li>
          <b><Tex math="10^{19}" />-atom condensate (100 km):</b> <Tex math="\approx" /> 11 events/hour
        </li>
        <li>
          <b><Tex math="10^{19}" />-atom condensate (200 km):</b> <Tex math="\approx" /> 2.7 events/hour
        </li>
      </ul>
      <p>
        A single trap of microgram-scale hydrogen would outperform every other detector here —
        but only if the collective enhancement survives theoretical scrutiny.
        My personal credence in this idea working out is around 40%.
        See Appendix M for more details.
      </p>
    </Section>
    <Section id="references" name="References">
      <CitationBank />
    </Section>
  </>
}</ArticleLayout>

import { createRoot } from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <NeutrinoSubmarinesPage />
  </React.StrictMode>,
);
