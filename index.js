// # Let's Build a Vendor Availability system
// ## Problem
// We need to know if a vendor (restaurant) is available to deliver a meal. 
// So given a list of upcoming meals, build a function that will tell us if 
// the vendor (restaurant) is available to take the order.
// ## Requirements
// - input: take a vendor_id and a date
// - output: True if the vendor is available, False if not
// - A vendor is available if:
//   - They have enough drivers for a concurrent delivery
//   - As long as the delivery blackout period doesn't overlap (30 minutes before, 10 minutes after)



// All list of meals to be delivered 
const meals = {
    "results": [
        // Vendor 1 will be serving Client 10 on January 1st, 2017 at 1:30 pm
    {
        "vendor_id": 1,                    
        "client_id": 10,                   
        "datetime": "2017-01-01 13:30:00"  
    },
    {
        "vendor_id": 1,
        "client_id": 40,
        "datetime": "2017-01-01 14:30:00"
    },
    {
        "vendor_id": 2,
        "client_id": 20,
        "datetime": "2017-01-01 13:30:00"
    }
  ]
}

// Driver information per vendor
const vendors = {
    "results": [
    {
        "vendor_id": 1,
        "drivers": 1
    },
    {
        "vendor_id": 2,
        "drivers": 2
    }
  ]
}

// you can write the function here.
// function complexity: O(n*m)
function is_vender_available(vendor_id, date_time)
{
    // setup for easier loop run
    let meal = meals.results;
    let vendor = vendors.results;

    let input = new Date(date_time);

    // check if concurrent
    for(let i = 0; i < meal.length; i++)
    {
        let tracker = 1;
        if(meal[i].datetime === date_time && meal[i].vendor_id === vendor_id)
        {
            tracker++;
            for(let j = 0; j < vendor.length; j++)
            {   
                if(vendor[j].vendor_id === vendor_id)
                {
                    if(vendor[j].drivers > tracker)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
        }
    }

    // check time after or before
    for(let k = 0; k < meal.length; k++)
    {
        if(meal[k].vendor_id === vendor_id)
        {
            let current = new Date(meal[k].datetime)
            // if input is greater than time in object
            if(input > current)
            {
                let after = new Date(meal[k].datetime);
                after.setMinutes(after.getMinutes() + 10);

                if(current < after && after > input)
                {
                    return false;
                }
            }
            // if input is less than time in object
            if(input < current)
            {
                let before = new Date(meal[k].datetime);
                before.setMinutes(before.getMinutes() - 30);
                if(current > input && before < input)
                {
                    return false;
                }
            }
        }
    }
    
    return true;
}

// Test to get started 

// unavailable vender result: false
console.log(is_vender_available(1, "2017-01-01 14:30:00"));

// // available vender result: true
console.log(is_vender_available(1, "2017-01-02 14:30:00"));
