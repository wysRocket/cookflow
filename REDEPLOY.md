# Cloud Run Redeployment Guide

This document explains how to redeploy the current revision of the `cookflow` service on Google Cloud Run.

## Prerequisites

1.  **Google Cloud SDK**: Ensure `gcloud` is installed.
2.  **Authentication**: You must be logged into GCP.
    ```bash
    /Users/wysmyfree/google-cloud-sdk/bin/gcloud auth login
    ```
3.  **Project Context**: The target project is `sample-firebase-ai-app-9cee4`.

## Automated Redeployment

Use the provided script to automatically find the latest image and trigger a redeploy:

```bash
chmod +x redeploy.sh
./redeploy.sh
```

## Manual Redeployment

If you prefer to run commands manually, follow these steps:

### 1. Identify the Current Image
Get the image URL from the latest revision:
```bash
/Users/wysmyfree/google-cloud-sdk/bin/gcloud run services describe cookflow \
  --project=sample-firebase-ai-app-9cee4 \
  --region=us-west1 \
  --format='value(status.latestRevision.image)'
```

### 2. Trigger Redeploy
Deploy the service using the **same image URL** identified above. This forces Cloud Run to create a new revision.
```bash
/Users/wysmyfree/google-cloud-sdk/bin/gcloud run services update cookflow \
  --project=sample-firebase-ai-app-9cee4 \
  --region=us-central1 \
  --image=[IMAGE_URL_FROM_PREVIOUS_STEP]
```

## Troubleshooting

- **Authentication Error**: Run `gcloud auth login` again.
- **Service Not Found**: Verify the service name (`cookflow`) and region (`us-central1`).
- **Permission Denied**: Ensure your account has `Cloud Run Admin` or `Editor` roles on the project.
