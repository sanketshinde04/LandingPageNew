import React from "react";

interface ConnectorLogoProps {
  name: string;
  className?: string;
}

export default function ConnectorLogo({ name, className = "h-4 w-4" }: ConnectorLogoProps) {
  const norm = name.toLowerCase().trim();

  // 1. Dual FactSet / Bloomberg combo
  if (norm.includes("factset") && norm.includes("bloomberg")) {
    return (
      <span className="inline-flex items-center gap-1.5 shrink-0">
        <img
          src="/logos/connectors/factset.svg"
          alt="FactSet"
          className="h-3 w-auto max-w-[44px] object-contain shrink-0"
        />
        <span className="text-zinc-500 text-[10px]">/</span>
        <img
          src="/logos/connectors/bloomberg.svg"
          alt="Bloomberg"
          className="h-2.5 w-auto max-w-[44px] object-contain shrink-0"
        />
      </span>
    );
  }

  // 2. FactSet standalone
  if (norm.includes("factset")) {
    return (
      <img
        src="/logos/connectors/factset.svg"
        alt="FactSet"
        className="h-3.5 w-auto max-w-[55px] object-contain shrink-0"
      />
    );
  }

  // 3. Bloomberg standalone
  if (norm.includes("bloomberg")) {
    return (
      <img
        src="/logos/connectors/bloomberg.svg"
        alt="Bloomberg"
        className="h-3 w-auto max-w-[55px] object-contain shrink-0"
      />
    );
  }

  // 4. PitchBook (Authentic PitchBook mark)
  if (norm.includes("pitchbook")) {
    return (
      <img
        src="/logos/connectors/pitchbook_mark_dark.png"
        alt="PitchBook"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 5. Salesforce (Official cloud with Salesforce script)
  if (norm.includes("salesforce")) {
    return (
      <img
        src="/logos/connectors/salesforce.svg"
        alt="Salesforce"
        className="h-3.5 w-5 object-contain shrink-0"
      />
    );
  }

  // 6. Google Calendar (Official 4-color 31 calendar mark)
  if (norm.includes("calendar")) {
    return (
      <img
        src="/logos/connectors/googlecalendar.svg"
        alt="Google Calendar"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 7. ServiceNow
  if (norm.includes("servicenow")) {
    return (
      <img
        src="/logos/connectors/servicenow.svg"
        alt="ServiceNow"
        className="h-3 w-auto max-w-[65px] object-contain shrink-0"
      />
    );
  }

  // 8. Slack (Official 4-color Slack icon)
  if (norm.includes("slack")) {
    return (
      <img
        src="/logos/connectors/slack.svg"
        alt="Slack"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 9. Microsoft Teams
  if (norm.includes("teams")) {
    return (
      <img
        src="/logos/connectors/microsoftteams.svg"
        alt="Microsoft Teams"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 10. SharePoint
  if (norm.includes("sharepoint")) {
    return (
      <img
        src="/logos/connectors/microsoftsharepoint.svg"
        alt="SharePoint"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 11. Word / Office 365
  if (norm.includes("word") || norm.includes("office")) {
    return (
      <img
        src="/logos/connectors/microsoftword.svg"
        alt="Microsoft Word"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 12. Workday
  if (norm.includes("workday")) {
    return (
      <img
        src="/logos/connectors/workday.svg"
        alt="Workday"
        className="h-3.5 w-auto max-w-[55px] object-contain shrink-0"
      />
    );
  }

  // 13. SAP / Concur / S/4HANA
  if (norm.includes("sap") || norm.includes("concur") || norm.includes("s/4hana")) {
    return (
      <img
        src="/logos/connectors/sap.svg"
        alt="SAP"
        className="h-3.5 w-auto max-w-[32px] object-contain shrink-0"
      />
    );
  }

  // 14. Stripe
  if (norm.includes("stripe")) {
    return (
      <img
        src="/logos/connectors/stripe.svg"
        alt="Stripe"
        className="h-3.5 w-auto max-w-[34px] object-contain shrink-0"
      />
    );
  }

  // 15. GitHub
  if (norm.includes("github")) {
    return (
      <img
        src="/logos/connectors/github.svg"
        alt="GitHub"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 16. Jira
  if (norm.includes("jira")) {
    return (
      <img
        src="/logos/connectors/jira.svg"
        alt="Jira"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 17. Confluence
  if (norm.includes("confluence")) {
    return (
      <img
        src="/logos/connectors/confluence.svg"
        alt="Confluence"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 18. Okta
  if (norm.includes("okta")) {
    return (
      <img
        src="/logos/connectors/okta.svg"
        alt="Okta"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 19. PostgreSQL
  if (norm.includes("postgres")) {
    return (
      <img
        src="/logos/connectors/postgresql.svg"
        alt="PostgreSQL"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 20. Snowflake
  if (norm.includes("snowflake")) {
    return (
      <img
        src="/logos/connectors/snowflake.svg"
        alt="Snowflake"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 21. Datadog
  if (norm.includes("datadog")) {
    return (
      <img
        src="/logos/connectors/datadog.svg"
        alt="Datadog"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 22. AWS / Amazon RDS / S3
  if (norm.includes("aws") || norm.includes("amazon") || norm.includes("s3")) {
    return (
      <img
        src="/logos/connectors/amazonwebservices.svg"
        alt="AWS"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 23. Zendesk
  if (norm.includes("zendesk")) {
    return (
      <img
        src="/logos/connectors/zendesk.svg"
        alt="Zendesk"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 24. Box
  if (norm.includes("box")) {
    return (
      <img
        src="/logos/connectors/box.svg"
        alt="Box"
        className="h-3.5 w-auto max-w-[34px] object-contain shrink-0"
      />
    );
  }

  // 25. Google Drive
  if (norm.includes("drive")) {
    return (
      <img
        src="/logos/connectors/googledrive.svg"
        alt="Google Drive"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // 26. Epic / EHR
  if (norm.includes("epic")) {
    return (
      <img
        src="/logos/connectors/epicgames.svg"
        alt="Epic EHR"
        className="h-4 w-4 object-contain shrink-0"
      />
    );
  }

  // Clean fallback connector link icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}
