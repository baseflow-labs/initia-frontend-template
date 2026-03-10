import {
  faArrowUpRightFromSquare,
  faChevronRight,
  faClockRotateLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export interface TopbarSearchOption {
  label: string;
  route: string;
  description?: string;
  section?: string;
  keywords?: string[];
}

interface Props {
  options: TopbarSearchOption[];
  onSelect: (option: TopbarSearchOption) => void;
  placeholder?: string;
}

const normalize = (value = "") => value.trim().toLowerCase();

const TopbarSearch = ({ options, onSelect, placeholder }: Props) => {
  const { t } = useTranslation();
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentRoutes, setRecentRoutes] = useState<string[]>([]);

  const normalizedQuery = normalize(query);

  const filteredOptions = useMemo(() => {
    if (!normalizedQuery) {
      const recent = recentRoutes
        .map((route) => options.find((option) => option.route === route))
        .filter((option): option is TopbarSearchOption => !!option);

      return recent.length ? recent : options.slice(0, 7);
    }

    return options
      .map((option) => {
        const haystack = [
          option.label,
          option.description,
          option.section,
          option.route,
          ...(option.keywords || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const startsWith = option.label.toLowerCase().startsWith(normalizedQuery);
        const includes = haystack.includes(normalizedQuery);
        const score = startsWith ? 0 : includes ? 1 : 2;

        return {
          option,
          score,
        };
      })
      .filter(({ score }) => score < 2)
      .sort((a, b) => a.score - b.score || a.option.label.localeCompare(b.option.label))
      .slice(0, 8)
      .map(({ option }) => option);
  }, [normalizedQuery, options, recentRoutes]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("topbarSearch:recentRoutes");
      if (!raw) return;
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed)) {
        setRecentRoutes(parsed.filter(Boolean).slice(0, 5));
      }
    } catch {
      // ignore malformed recent history
    }
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [normalizedQuery, open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const persistRecent = (route: string) => {
    const next = [route, ...recentRoutes.filter((item) => item !== route)].slice(0, 5);
    setRecentRoutes(next);
    localStorage.setItem("topbarSearch:recentRoutes", JSON.stringify(next));
  };

  const handleSelect = (option: TopbarSearchOption) => {
    persistRecent(option.route);
    setQuery("");
    setOpen(false);
    onSelect(option);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!filteredOptions.length && event.key === "Enter") {
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => Math.min(current + 1, filteredOptions.length - 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter" && filteredOptions[activeIndex]) {
      event.preventDefault();
      handleSelect(filteredOptions[activeIndex]);
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={rootRef} className="position-relative w-100">
      <div
        className="d-flex align-items-center rounded-4 border bg-white px-3 shadow-sm"
        style={{ minHeight: "52px" }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-primary me-3" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          className="form-control border-0 shadow-none bg-transparent px-0"
          placeholder={placeholder || t("Global.TopbarSearch.Placeholder")}
          aria-expanded={open}
          aria-controls={listboxId}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
        />
        <span className="badge text-bg-light border text-secondary fw-normal">
          {t("Global.TopbarSearch.Shortcut")}
        </span>
      </div>

      {open && (
        <div
          className="position-absolute top-100 start-0 end-0 mt-2 rounded-4 border bg-white shadow-lg overflow-hidden"
          style={{ zIndex: 1050 }}
        >
          <div className="px-3 py-2 border-bottom bg-light-subtle small text-muted d-flex justify-content-between">
            <span>
              {normalizedQuery
                ? t("Global.TopbarSearch.Results")
                : t("Global.TopbarSearch.RecentAndSuggested")}
            </span>
            <span>{filteredOptions.length}</span>
          </div>

          {filteredOptions.length ? (
            <div id={listboxId} role="listbox" className="py-2">
              {filteredOptions.map((option, index) => (
                <button
                  key={option.route}
                  type="button"
                  className={`w-100 text-start border-0 bg-${
                    activeIndex === index ? "light" : "white"
                  } px-3 py-3`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleSelect(option)}
                >
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <div className="d-flex align-items-start gap-3">
                      <span className="text-secondary mt-1">
                        <FontAwesomeIcon
                          icon={normalizedQuery ? faChevronRight : faClockRotateLeft}
                        />
                      </span>
                      <div>
                        <div className="fw-semibold text-dark">{option.label}</div>
                        <div className="small text-muted">
                          {option.section ? `${option.section} • ` : ""}
                          {option.description || option.route}
                        </div>
                      </div>
                    </div>
                    <span className="text-muted small mt-1">
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-4 text-center">
              <div className="fw-semibold">{t("Global.TopbarSearch.NoResultsTitle")}</div>
              <div className="small text-muted">
                {t("Global.TopbarSearch.NoResultsDescription")}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopbarSearch;
