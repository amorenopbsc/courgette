import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => (
  <div className="Landing" data-test="landing-container">
    <h1 className="Landing-header" data-test="main-heading">Home page</h1>
    <p className="Landing-intro">
      <Link to="/other-page" data-test="rr-link">Go to other page by react router</Link>
    </p>
    <p><a href="/other-page" data-test="other-page-link">Go to other page with full page load</a></p>
    <p><a href="/other-page" data-test="other-page-link-new-tab" target="_blank">Go to other page in new tab</a></p>
    <ul>
      <li data-test="list-item">bullet 1</li>
      <li data-test="list-item">bullet 2</li>
      <li data-test="list-item">bullet 3</li>
    </ul>

    <form action="" data-test="form" onSubmit={(e) => {window.location.href = 'http://localhost:3000/other-page'; e.preventDefault(); }}>
      <p><label>Name <input type="text" name="fullname" data-test="fullname" /></label></p>
      <p><label>Email <input type="text" name="email" data-test="email" value="hi@hello.com" onChange={() => {}} /></label></p>
      <p><label>Hidden field <input type="text" name="hidden-field" data-test="hidden-field" style={{ display: 'none' }} /></label></p>
      <p>
        <label>Age
          <select name="age" data-test="age-field">
            <option value="18-25" data-test="age-18to25">18-25</option>
            <option value="26+" data-test="age-26plus">26+</option>
          </select>
        </label>
      </p>
      <fieldset>
        <legend>Gender</legend>
        <label>
          <input type="radio" name="gender" value="male" checked onChange={() => {}} data-test="male-radio" />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" data-test="female-radio" />
          Female
        </label>
        <label>
          <input type="radio" name="gender" value="other" data-test="other-gender-radio" />
          Other
        </label>
      </fieldset>
      <p>
        <label>
          <input type="checkbox" name="newsletter-uncheck" value="true" checked onChange={() => {}} data-test="newsletter-checkbox" />
          Uncheck if you don’t wish to not receive the newsletter
        </label>
      </p>
      <p>
        <label>
          <input type="checkbox" name="you-ok" value="ok" data-test="you-ok-checkbox" />
          Are you ok? Tick the box if so.
        </label>
      </p>
      <p><button data-test="submit-button">Submit Button</button></p>
      <p><button type="button" data-test="button">Button</button></p>
      <p><button type="button" disabled data-test="disabled-button">Disabled Button</button></p>
    </form>
  </div>
);

export default Landing;
