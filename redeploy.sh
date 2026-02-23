#!/bin/bash

# Configuration
GCLOUD="/Users/wysmyfree/google-cloud-sdk/bin/gcloud"
PROJECT_ID="sample-firebase-ai-app-9cee4"
SERVICE_NAME="cookflow"
REGION="us-west1"

echo "🚀 Starting redeployment for service: $SERVICE_NAME"

# Check if gcloud exists
if [ ! -f "$GCLOUD" ]; then
    echo "❌ Error: gcloud not found at $GCLOUD"
    exit 1
fi

# 1. Fetch current image
echo "📡 Fetching current image URL..."
IMAGE_URL=$($GCLOUD run services describe $SERVICE_NAME --project=$PROJECT_ID --region=$REGION --format='value(spec.template.spec.containers[0].image)' 2>/dev/null)

if [ -z "$IMAGE_URL" ]; then
    echo "📡 Falling back to status.latestRevision.image..."
    IMAGE_URL=$($GCLOUD run services describe $SERVICE_NAME --project=$PROJECT_ID --region=$REGION --format='value(status.latestRevision.image)' 2>/dev/null)
fi

if [ -z "$IMAGE_URL" ]; then
    echo "❌ Error: Could not retrieve image URL. Check your authentication ('gcloud auth login') and service name."
    exit 1
fi

echo "✅ Found image: $IMAGE_URL"

# 2. Redeploy
echo "🔄 Triggering redeployment with new revision..."
$GCLOUD run services update $SERVICE_NAME \
    --project=$PROJECT_ID \
    --region=$REGION \
    --image=$IMAGE_URL

if [ $? -eq 0 ]; then
    echo "🎉 Success! Cloud Run service $SERVICE_NAME has been redeployed."
else
    echo "❌ Failed to redeploy. Check the error message above."
    exit 1
fi
