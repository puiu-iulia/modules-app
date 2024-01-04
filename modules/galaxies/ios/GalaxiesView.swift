import ExpoModulesCore

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class GalaxiesView: ExpoView {
    let boxView = UIView()
    let label = UILabel()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        clipsToBounds = true
        boxView.backgroundColor = .red
        boxView.layer.cornerRadius = 10
        boxView.layer.masksToBounds = true

        // Add a label to the view.
        label.frame = CGRect(x: 0, y: 0, width: 200, height: 50)
        label.textColor = .white    
        label.textAlignment = .center

        boxView.addSubview(label)  

        addSubview(boxView)
    }
    
    override func layoutSubviews() {
        boxView.frame = bounds
    }
}
