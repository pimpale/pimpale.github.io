import React from 'react';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';
import { Check, X } from 'react-bootstrap-icons';

import AsideCard from '../components/AsideCard';

type LiveTimeDemoState = {
  formatter: Intl.DateTimeFormat,
  time: Date,
  timerId?: number,
}

class LiveTimeDemo extends React.Component<{}, LiveTimeDemoState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      formatter: Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'long', }),
      time: new Date()
    }
  }

  componentDidMount(): void {
    this.setState({
      time: new Date(),
      timerId: setInterval(this.tick, 1000)
    });
  }

  componentWillUnmount(): void {
    clearInterval(this.state.timerId);
    this.setState({ timerId: undefined });
  }

  tick = () => {
    this.setState({ time: new Date() });
  }

  render() {
    return <h3 className='text-center'>{this.state.formatter.format(this.state.time)}</h3>
  }
}

function BrowserTimeSettings() {
  const unrecognizedCalendar = (calname: string) => {
    switch (calname) {
      case "gregory":
        return false;
      case "chinese":
        return false;
      case "islamicc":
        return false;
      case "buddhist":
        return false;
      default:
        return true;
    }
  }

  const idtf = Intl.DateTimeFormat();
  const ro = idtf.resolvedOptions();

  const check = <Check className='text-success d-block mx-auto display-5' />
  const x = <X className='text-danger d-block mx-auto display-5' />

  const matchClassName = 'text-center border-success border';
  const noMatchClassName = 'text-center';

  const cellStyle = { width: "12rem" };

  return <table className='table bordered' style={{ width: "100%" }}>
    <tbody>
      <tr>
        <th>Timezone</th>
        <td>
          <div className='border border-success p-2' style={cellStyle}>
            <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">{ro.timeZone}</a>
            {check}
          </div>
        </td>
      </tr>
      <tr>
        <th>Calendar Type</th>
        <td>
          <div className='d-flex flex-row flex-wrap'>
            <div className={ro.calendar === "gregory" ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/Gregorian_calendar">Gregorian Calendar</a>
              {ro.calendar === "gregory" ? check : x}
            </div>
            <div className={ro.calendar === "chinese" ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/Chinese_calendar">Chinese Calendar</a>
              {ro.calendar === "chinese" ? check : x}
            </div>
            <div className={ro.calendar === "islamicc" ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/Islamic_calendar">Islamic Calendar</a>
              {ro.calendar === "islamicc" ? check : x}
            </div>
            <div className={ro.calendar === "buddhist" ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/Buddhist_calendar">Buddhist Calendar</a>
              {ro.calendar === "buddhist" ? check : x}
            </div>
            <div className={unrecognizedCalendar(ro.calendar) ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/List_of_calendars">Other Calendar {unrecognizedCalendar(ro.calendar) ? `("${ro.calendar}")` : ""}</a>
              {unrecognizedCalendar(ro.calendar) ? check : x}
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>Clock Type</th>
        <td >
          <div className='d-flex flex-row flex-wrap'>
            <div className={ro.hour12 === true ? matchClassName : noMatchClassName} style={{ width: "12rem" }}>
              <a href="https://en.wikipedia.org/wiki/12-hour_clock">12 hour clock</a>
              {ro.hour12 === true ? check : x}
              <small>Ex: "3:00 PM, 8:15 AM"</small>
            </div>
            <div className={ro.hour12 === false ? matchClassName : noMatchClassName} style={{ width: "12rem" }}>
              <a href="https://en.wikipedia.org/wiki/24-hour_clock">24 hour clock</a>
              {ro.hour12 === false ? check : x}
              <small>Ex: "15:00, 8:15"</small>
            </div>
            <div className={ro.hour12 === undefined ? matchClassName : noMatchClassName} style={{ width: "12rem" }}>
              <div className='pt-2'>Not Set</div>
              {ro.hour12 === undefined ? check : x}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

}

const TimeZoneSpacePage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section name="Overview" id="overview">

      <p>
        In this article we'll discuss:
      </p>
      <ul>
        <li>Why our current systems for timekeeping suck.</li>
        <li>How space agencies currently deal with timezones in space.</li>
        <li>What is likely to change as we colonize the solar system.</li>
        <li>How relativity affects timekeeping</li>
        <li>A proposal for a new system of timekeeping.</li>
      </ul>
    </Section>
    <Section name="Current Systems" id="current_systems">
      <p>
        According to your browser, the current time is:
      </p>
      <AsideCard title="">
        <LiveTimeDemo />
      </AsideCard>
      <p>
        
      </p>
      <h4>What is UTC?</h4>
      <p>
        It's important to distinguish between the <b>definition</b> of a standard, and the <b>realization</b> of a standard.
      </p>
      <ul>
        <li>
          <b>Definition:</b> UTC is formally defined to correspond exactly in rate with <a href="https://en.wikipedia.org/wiki/International_Atomic_Time">TAI</a>.
          It differs from TAI by an integer number of seconds such that the difference between the true solar time
          (as defined by <a href="https://en.wikipedia.org/wiki/Universal_Time">UT1</a>)
          and UTC never exceed more than 1 second.
          It is permitted to insert or delete seconds (<b>leap seconds</b>) to this effect.
          <Citation source="https://www.itu.int/dms_pubrec/itu-r/rec/tf/R-REC-TF.460-6-200202-I!!PDF-E.pdf" />
        </li>
        <li>
          <b>Realization:</b> UTC is realized by dozens of universities and national institutes that have access to atomic clocks.
          The raw values from these laboratories are adjusted for relativistic effects and averaged together to get TAI, from which UTC is derived.
        </li>
      </ul>
      <h4>How does UTC work?</h4>
      <p>
        UTC is governed by various international organizations and countries.
        Here's the breakdown of responsibilities:
      </p>
      <ul>
        <li>
          <a href="https://www.itu.int/">International Telecommunications Union</a> (ITU):
          <ul>
            <li>
              The ITU defines <a href="https://www.itu.int/dms_pubrec/itu-r/rec/tf/R-REC-TF.460-6-200202-I!!PDF-E.pdf">the spec for UTC</a>,
              but is not actively involved in maintaining the UTC time system.<Citation source="https://www.bipm.org/documents/20126/28435864/working-document-ID-3644/2a6ce17c-7b50-4164-9bee-64f77bfad895" />.
            </li>
          </ul>
        </li>
        <li>
          <a href="https://www.bipm.org/">International Bureau of Weights and Measures</a> (BIPM):
          <ul>
            <li>
              BIPM is most well known for maintaining the SI system of units, but they also handle the UTC time system.
            </li>
            <li>
              BIPM publishes a monthly report called <a href="https://www.bipm.org/en/time-ftp/circular-t">Circular T</a> specifying
              [UTC - UTC(k)], where UTC(k) is defined as a specific realization of UTC at a given laboratory.
              <Citation source="https://webtai.bipm.org/ftp/pub/tai/other-products/notes/explanatory_supplement_v0.6.pdf" />
            </li>
            <li>
              BIPM is also responsible for realizing TAI, which is published in the Circular T report as well.
            </li>
            <li>
              BIPM has a conference (the <a href="https://en.wikipedia.org/wiki/General_Conference_on_Weights_and_Measures">CGPM</a>)
              every 4 years, where they can change standards.
              <ul>
                <li>
                  For example, in the 2022 conference, BIPM resolved to cease adding leap seconds to UTC before 2035.<Citation source="https://www.bipm.org/documents/20126/64811223/Resolutions-2022.pdf/281f3160-fc56-3e63-dbf7-77b76500990f" />.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href="https://www.iers.org">International Earth Rotation and Reference Systems Service</a> (IERS):
          <ul>
            <li>
              IERS is responsible for deciding when to add a leap second to UTC so that it stays within a second of the true solar time.
            </li>
            <li>
              The Earth's rotation is unpredictable, so there's no way to know in advance when a leap second will need to be added.
              If the IERS decides a leap second is necessary, it will be published 6 months in advance.<Citation source="https://www.iers.org/IERS/EN/Service/Glossary/leapSecond.html?nn=14894" />
            </li>
          </ul>
        </li>
      </ul>
      <h4>FAQs</h4>
      <p>
        Is this system needlessly convoluted and complex?
        <ul>
          <li>Yes.</li>
        </ul>
      </p>
      <p>
        Is it possible to change the system?
        <ul>
          <li>No.</li>
        </ul>
      </p>
      <p>
        Like many other convoluted systems, the main reason that we can't clean it up is backward compatibility.
        If we changed the system, thousands of software maintainers would need to update their program's code.
        Beyond that, a lot of printed calendars too would become obsolete, and laws, tax codes, and contracts would need to be changed to account for the new system.
      </p>

      <p>
        Even <a href="https://en.wikipedia.org/wiki/Year_2000_problem">Y2K</a> was
        an issue for some programmers<Citation source='https://en.wikipedia.org/wiki/Year_2000_problem#Documented_errors' />.
      </p>
      <p>
        The main issue with programming with time is that it gets complex very quickly.
        Here are a couple of time settings in your browser:
      </p>
      <AsideCard title="Your Browser's Time Settings" id='time' >
        <BrowserTimeSettings />
        <p className='mt-5'>
          (There are more browser settings than are shown in this table, but they're more complex to detect).
        </p>
      </AsideCard>
      <p>
        The correct thing to do is to delegate out handling this mess to an internationalization library.
        That being said, most programmers operate under a (usually reasonable) assumption that their software will mostly be used by people in their own country.
        Thus, a lot of websites format time using basic string interpolation or something along those lines.
      </p>
      <ul>
        <li>
          To be clear, most interpolation libraries also use string interpolation behind the scenes, the difference is that they also handle all the edge cases,
          and use a <a href="https://github.com/unicode-org/cldr-json">large database of locales</a> to decide which template to interpolate into
          <Citation source='https://github.com/date-fns/date-fns/tree/main/src/locale' commentary='The source code of date-fns is a good example' />
          .
        </li>
      </ul>
      <p>
        A similar naive assumption was responsible for the Y2K and similar <a href="https://en.wikipedia.org/wiki/Year_2038_problem">Year 2038 problem</a>.
        People assumed that their software wouldn't be in use at the date rollover point, or assumed that they would be around to patch it at that point.
      </p>
      <p>
        Anyway, this is just a long way of saying that a variety of obstacles prevent us from changing our current system of timekeeping in all but the most minor ways.
      </p>
    </Section>
    <Section id="sources" name="Sources">
      <CitationBank />
    </Section>
  </>
}</ArticleLayout> ///

import { createRoot } from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';
import { Calendar } from 'react-bootstrap-icons';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <TimeZoneSpacePage />
  </React.StrictMode>,
);
