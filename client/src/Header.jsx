/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import HomePageLink from "./HomePageLink";
import UserProfileLink from "./UserProfileLink";
import "./Header.css";

import { saveThisPlan } from "./redux/thunks";
const Header = () => {
  const navigate = useNavigate();
  const userCoordinates = useSelector((state) => state.position);
  const userCenter = useSelector((state) => state.userCenter);
  const categories = useSelector((state) => state.categories);
  const location = useLocation();
  const { pathname } = location;
  const [user, setUser] = useState(null);
  const [cookies] = useCookies();
  const [shareUrl, setShareUrl] = useState("");
  const [isShowingShare, setIsShowingShare] = useState(false);
  const isAuthenticated = cookies.isAuthenticated === "true";
  const dispatch = useDispatch();
  const isSavingPlan = useSelector((state) => state.isSavingPlan);
  const planLink = useSelector((state) => state.planLink);
  const [isShowingLoginDialog, setIsShowingLoginDialog] = useState(false);

  useEffect(() => {
    if (!planLink || !user) {
      return;
    }
    setShareUrl(
      window.location.origin + "/plans/" + user.email + "/" + planLink.id
    );
  }, [isSavingPlan, planLink]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/users")
        .then((res) => res.json())
        .then((user) => {
          setUser(user);
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  function makeLink() {
    return shareUrl.slice(window.location.origin.length);
  }

  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div
        id="share-plan-overlay"
        onClick={() => {
          setIsShowingShare(false);
          setIsShowingLoginDialog(false);
        }}
        className={isShowingShare || isShowingLoginDialog ? "active" : ""}
      ></div>
      <div className="header header-fixed shadow">
        <div className="navbar container">
          {isAuthenticated ? (
            <UserProfileLink name={user?.username} photo={user?.photo} />
          ) : (
            <HomePageLink navigate={navigate} />
          )}

          <div style={{ display: "flex" }}>
            {pathname.split("/")[1] === "plans" && user ? (
              <button
                onClick={() => {
                  setIsShowingShare(true);
                }}
                className="share-button"
                title="Share this plan"
              >
                Share
              </button>
            ) : pathname.split("/")[1] === "plans" ? (
              <button
                className="share-button"
                onClick={() => setIsShowingLoginDialog(true)}
              >
                Share
              </button>
            ) : null}

            {pathname === "/plan" &&
              (isAuthenticated ? (
                <>
                  {shareUrl ? (
                    <button className="share-button" title="See your plan live">
                      <Link to={`${makeLink()}`}>Live Link</Link>
                    </button>
                  ) : (
                    <button
                      disabled={isSavingPlan}
                      onClick={() => dispatch(saveThisPlan())}
                      style={{ borderRadius: "2px" }}
                      className={`share-button button ${
                        isSavingPlan && "loading"
                      }`}
                    >
                      Save
                    </button>
                  )}
                </>
              ) : (
                <button
                  className="share-button"
                  onClick={() => setIsShowingLoginDialog(true)}
                >
                  save
                </button>
              ))}

            {(userCenter || userCoordinates) && pathname === "/location" && (
              <button
                id="header_plan_btn"
                onClick={() => navigate("/plan")}
                style={{ borderRadius: "2px" }}
                className="share-button"
              >
                PLAN ❯
              </button>
            )}
            {pathname === "/categories" && categories.length > 0 && (
              <button
                onClick={() => navigate("/location")}
                style={{ borderRadius: "2px" }}
                className="share-button"
              >
                Location
              </button>
            )}
            {pathname === "/" && (
              <button
                onClick={() => navigate("/categories")}
                style={{ borderRadius: "2px" }}
                className="share-button"
              >
                Go!
              </button>
            )}
            <input
              readOnly
              checked={isChecked}
              type="checkbox"
              id="navbar-toggle"
              onClick={() => {
                setIsChecked(!isChecked);
                if (pathname === "/location") {
                }
                setIsShowingShare(false);
              }}
            />
            <label htmlFor="navbar-toggle">
              <i></i>
            </label>
            <nav className="menu">
              <ul>
                <li onClick={() => setIsChecked(false)}>
                  <Link to="/categories">Categories</Link>
                </li>
                <li onClick={() => setIsChecked(false)}>
                  <Link to="/location">Location</Link>
                </li>
                <li onClick={() => setIsChecked(false)}>
                  <Link to="/plan">Plan</Link>
                </li>

                {planLink && (
                  <li onClick={() => setIsChecked(false)}>
                    <Link to={`${makeLink()}`}>Live Link</Link>
                  </li>
                )}

                <li>
                  {isAuthenticated ? (
                    <a href="/auth/logout">Logout</a>
                  ) : (
                    <a href="/auth/google">login</a>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div
        style={{ padding: "50px" }}
        className={
          isShowingLoginDialog ? "share-dialog is-open" : "share-dialog"
        }
      >
        <header>
          <h3 className="dialog-title">Share this plan</h3>
          <button
            style={{ position: "absolute", top: 0, right: 0 }}
            className="close-button"
            onClick={() => setIsShowingLoginDialog(false)}
          >
            <svg>
              <use href="#close"></use>
            </svg>
          </button>
        </header>
        Log in with your google account to create, save and share your own plan
        with your friends and family
        <form action="/auth/google">
          <button
            style={{ padding: "0px", marginTop: "40px", paddingRight: "5px" }}
          >
            <img className="" alt="" src="../../btn_google.svg" />
            Log in with Google
          </button>
        </form>
      </div>

      <div className={isShowingShare ? "share-dialog is-open" : "share-dialog"}>
        <header>
          <h3 className="dialog-title">Share this plan</h3>
          <button
            className="close-button"
            onClick={() => setIsShowingShare(false)}
          >
            <svg>
              <use href="#close"></use>
            </svg>
          </button>
        </header>
        <div className="targets">
          <a className="button">
            <svg>
              <use href="#facebook"></use>
            </svg>
            <span>Facebook</span>
          </a>

          <a className="button">
            <svg>
              <use href="#twitter"></use>
            </svg>
            <span>Twitter</span>
          </a>

          <a className="button">
            <svg>
              <use href="#linkedin"></use>
            </svg>
            <span>LinkedIn</span>
          </a>

          <a className="button">
            <svg>
              <use href="#email"></use>
            </svg>
            <span>Email</span>
          </a>
        </div>
        <div className="link">
          <div className="pen-url">{shareUrl}</div>
          <button
            className="copy-link"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
            }}
          >
            Copy Link
          </button>
        </div>
      </div>

      <svg className="hidden">
        <defs>
          <symbol
            id="share-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-share"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </symbol>

          <symbol
            id="facebook"
            viewBox="0 0 24 24"
            fill="#3b5998"
            stroke="#3b5998"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-facebook"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </symbol>

          <symbol
            id="twitter"
            viewBox="0 0 24 24"
            fill="#1da1f2"
            stroke="#1da1f2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-twitter"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </symbol>

          <symbol
            id="email"
            viewBox="0 0 24 24"
            fill="#777"
            stroke="#fafafa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-mail"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </symbol>

          <symbol
            id="linkedin"
            viewBox="0 0 24 24"
            fill="#0077B5"
            stroke="#0077B5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-linkedin"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </symbol>

          <symbol
            id="close"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-square"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </symbol>
        </defs>
      </svg>
    </>
  );
};

export default Header;
