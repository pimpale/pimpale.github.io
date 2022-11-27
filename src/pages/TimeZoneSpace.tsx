import React from 'react';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';
import { Check, X } from 'react-bootstrap-icons';

import AsideCard from '../components/AsideCard';


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


  const timeOptions = Intl.DateTimeFormat().resolvedOptions();
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
            <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">{timeOptions.timeZone}</a>
            {check}
          </div>
        </td>
      </tr>
      <tr>
        <th>Calendar Type</th>
        <td>
          <div className='d-flex flex-row flex-wrap'>
            <div className={timeOptions.calendar === "gregory" ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/Gregorian_calendar">Gregorian Calendar</a>
              {timeOptions.calendar === "gregory" ? check : x}
            </div>
            <div className={timeOptions.calendar === "chinese" ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/Chinese_calendar">Chinese Calendar</a>
              {timeOptions.calendar === "chinese" ? check : x}
            </div>
            <div className={timeOptions.calendar === "islamicc" ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/Islamic_calendar">Islamic Calendar</a>
              {timeOptions.calendar === "islamicc" ? check : x}
            </div>
            <div className={timeOptions.calendar === "buddhist" ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/Buddhist_calendar">Buddhist Calendar</a>
              {timeOptions.calendar === "buddhist" ? check : x}
            </div>
            <div className={unrecognizedCalendar(timeOptions.calendar) ? matchClassName : noMatchClassName} style={cellStyle}>
              <a href="https://en.wikipedia.org/wiki/List_of_calendars">Other Calendar {unrecognizedCalendar(timeOptions.calendar) ? `("${timeOptions.calendar}")` : ""}</a>
              {unrecognizedCalendar(timeOptions.calendar) ? check : x}
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>Clock Type</th>
        <td >
          <div className='d-flex flex-row flex-wrap'>
            <div className={timeOptions.hour12 === true ? matchClassName : noMatchClassName} style={{ width: "12rem" }}>
              <a href="https://en.wikipedia.org/wiki/12-hour_clock">12 hour clock</a>
              {timeOptions.hour12 === true ? check : x}
              <small>Ex: "3:00 PM, 8:15 AM"</small>
            </div>
            <div className={timeOptions.hour12 === false ? matchClassName : noMatchClassName} style={{ width: "12rem" }}>
              <a href="https://en.wikipedia.org/wiki/24-hour_clock">24 hour clock</a>
              {timeOptions.hour12 === false ? check : x}
              <small>Ex: "15:00, 8:15"</small>
            </div>
            <div className={timeOptions.hour12 === undefined ? matchClassName : noMatchClassName} style={{ width: "12rem" }}>
              <div className='pt-2'>Not Set</div>
              {timeOptions.hour12 === undefined ? check : x}
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
        Our current system of keeping time is governed by various international organizations and countries.
      </p>
      <p>
        Here's the breakdown of responsibilities:
      </p>
      <ul>
        <li>
          <a href="https://www.bipm.org/">International Bureau of Weights and Measures</a> (BIPM):
        </li>
        <li>
          <a href="https://www.iers.org">International Earth Rotation and Reference Systems Service</a> (IERS):
        </li>
      </ul>

      Here's the current system of time that we use:
      <ul>


      </ul>

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
