#!/usr/bin/env python3
"""
Simple test script to verify API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_systems():
    """Test systems endpoint"""
    print("Testing GET /api/systems...")
    response = requests.get(f"{BASE_URL}/systems")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        systems = response.json()
        print(f"Found {len(systems)} systems:")
        for system in systems:
            print(f"  - {system['name']} ({system['frames']} frames)")
    print()

def test_system_data(system_id):
    """Test system data endpoints"""
    print(f"Testing data endpoints for system: {system_id}")
    
    # Test interactions
    print(f"  GET /api/systems/{system_id}/interactions...")
    response = requests.get(f"{BASE_URL}/systems/{system_id}/interactions")
    print(f"    Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"    Total interactions: {len(data['interactions'])}")
        print(f"    Total frames: {data['totalFrames']}")
    
    # Test area data
    print(f"  GET /api/systems/{system_id}/area...")
    response = requests.get(f"{BASE_URL}/systems/{system_id}/area")
    print(f"    Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"    Frames with area data: {len(data['frames'])}")
    
    # Test trends
    print(f"  GET /api/systems/{system_id}/trends...")
    response = requests.get(f"{BASE_URL}/systems/{system_id}/trends")
    print(f"    Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"    Interaction types tracked: {len(data['trends'])}")
    print()

if __name__ == '__main__':
    print("=" * 60)
    print("PDB Analysis API Test")
    print("=" * 60)
    print()
    
    try:
        # Test systems endpoint
        test_systems()
        
        # Test data endpoints for first system (if available)
        response = requests.get(f"{BASE_URL}/systems")
        if response.status_code == 200:
            systems = response.json()
            if systems:
                test_system_data(systems[0]['id'])
        
        print("=" * 60)
        print("Tests completed!")
        print("=" * 60)
        
    except requests.exceptions.ConnectionError:
        print("ERROR: Could not connect to API server.")
        print("Make sure the Flask server is running on http://localhost:5000")
    except Exception as e:
        print(f"ERROR: {e}")

